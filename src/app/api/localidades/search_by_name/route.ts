import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma'
import unidecode from 'unidecode'

export async function POST(request: NextRequest) {
  const { query } = await request.json()

  const formattedQuery = unidecode(query.toUpperCase())

  const foundPlaces = await prisma.place.findMany({
    where: {
      name: {
        contains: formattedQuery,
      },
    },
    select: {
      id: true,
      name: true,
    },
  })

  return NextResponse.json(foundPlaces)
}
