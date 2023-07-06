import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma'

export async function POST(request: NextRequest) {
  const { query } = await request.json()

  // const formattedQuery = unidecode(query.toUpperCase())

  const foundPlaces = await prisma.place.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
    },
  })

  return NextResponse.json(foundPlaces)
}
