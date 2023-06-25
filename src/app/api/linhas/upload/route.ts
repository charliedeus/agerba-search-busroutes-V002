import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma'
import { writeFile } from 'fs/promises'
import { Readable, Transform } from 'node:stream'
import { createReadStream } from 'fs'
import csvtojson from 'csvtojson'
import { WritableStream, TransformStream } from 'node:stream/web'
import unidecode from 'unidecode'

// interface CityProps {
//   id: string
//   ibgeCode: string
//   name: string
//   coverUrl?: string
//   countOriginViews: number
//   countDestinyViews: number
// }

export async function POST(request: NextRequest) {
  const cities = await prisma.city.findMany()

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

          const mappedData = {
            cdlinha: Number(data.cdlinha),
            cdlinhapai: Number(data.cdlinhapai) || null,
            nulinha: data.nulinha,
            dedescricao: data.dedescricao,
            deorigem: data.deorigem,
            dedestino: data.dedestino,
            derazaosocial: data.derazaosocial || null,
            decnpjmatriz: data.decnpjmatriz || null,
            nupermissionarios: Number(data.nupermissionarios) || null,
          }

          const originCity = cities.find((city) =>
            String(unidecode(city.name.toLowerCase())).includes(
              unidecode(mappedData.deorigem.toLowerCase()),
            ),
          )

          if (!originCity) {
            return
          }

          const destinyCity = cities.find((city) =>
            String(unidecode(city.name.toLowerCase())).includes(
              unidecode(mappedData.dedestino.toLowerCase()),
            ),
          )

          if (!destinyCity) {
            return
          }

          const busRoute = {
            bus_route_number: mappedData.nulinha,
            name: mappedData.dedescricao.toUpperCase(),
            operator: mappedData.derazaosocial?.toUpperCase() || null,
            operator_id: mappedData.decnpjmatriz || null,
            count_permit_holders: Number(mappedData.nupermissionarios) || null,
            previous_id: Number(mappedData.cdlinha),
            previous_parent_key: Number(mappedData.cdlinhapai) || null,
            starts_in_id: originCity.id,
            ends_in_id: destinyCity.id,
          }

          await prisma.busRoute.create({
            data: busRoute,
          })

          controller.enqueue(JSON.stringify(busRoute).concat('\n'))
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
