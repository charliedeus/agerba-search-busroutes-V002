import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const response = await fetch(
    'http://www.agerba.ba.gov.br:4000/api/noticias',
    {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    },
  )

  const lastNews = await response.json()

  return NextResponse.json(lastNews)
}
