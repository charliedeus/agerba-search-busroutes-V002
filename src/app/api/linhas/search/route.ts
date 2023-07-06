import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma'

export async function POST(request: NextRequest) {
  const { placesId } = await request.json()

  const candidateBusRoutes = await prisma.busRoute.findMany({
    where: {
      itinerary: {
        some: {
          place_itinerary: {
            some: {
              place_id: {
                in: placesId,
              },
            },
          },
        },
      },
    },
    include: {
      itinerary: {
        include: {
          place_itinerary: {
            select: {
              place: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
      timetable: true,
    },
  })

  const busRoutes = candidateBusRoutes
    .map((item) => {
      const formattedPlace = {
        id: item.id,
        busRouteNumber: item.bus_route_number,
        name: item.name,
        operator: item.operator,
        operatorId: item.operator_id,
        isActive: item.is_active,
        itinerary: item.itinerary[0].place_itinerary.map((item) => {
          return item.place
        }),
        itineraryIds: item.itinerary[0].place_itinerary.map(
          (item) => item.place.id,
        ),
        timetable: item.timetable,
      }

      const containsAllPlaces = placesId.every((element: string) =>
        formattedPlace.itineraryIds.includes(element),
      )

      if (!containsAllPlaces) {
        // eslint-disable-next-line
      return null
      }

      return formattedPlace
    })
    .filter((item) => item !== null)

  busRoutes.sort((a, b) => {
    const regex = /\d+/g
    const numA = Number(a!.busRouteNumber.match(regex)![0])
    const numB = Number(b!.busRouteNumber.match(regex)![0])

    return numA - numB
  })

  return NextResponse.json(busRoutes)
}
