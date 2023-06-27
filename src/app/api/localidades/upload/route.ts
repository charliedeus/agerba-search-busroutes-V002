import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma'
import { writeFile } from 'fs/promises'
import { Readable, Transform } from 'node:stream'
import { createReadStream } from 'fs'
import csvtojson from 'csvtojson'
import { TransformStream, WritableStream } from 'node:stream/web'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = `./tmp/${file.name}`
  await writeFile(path, buffer)
  console.log(`Open ${path} to see the upload file`)

  Readable.toWeb(createReadStream(path))
    .pipeThrough(Transform.toWeb(csvtojson()))
    .pipeThrough(
      new TransformStream({
        async transform(chunk, controller): Promise<void> {
          const data = JSON.parse(Buffer.from(chunk).toString('utf-8'))

          const place = {
            name: data.denome,
            legacy_id: Number(data.cdlinhalocalidade),
          }

          await prisma.place.create({
            data: place,
          })

          controller.enqueue(JSON.stringify(place).concat('\n'))
        },
      }),
    )
    .pipeTo(
      new WritableStream({
        async write() {
          NextResponse.next()
        },
        close() {
          NextResponse.json({ success: true })
        },
      }),
    )

  return NextResponse.json({ success: true })
}
