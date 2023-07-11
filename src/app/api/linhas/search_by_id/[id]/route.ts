import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../prisma'

interface TimesTableProps {
  id: string
  direction: string
  weekday: string
  starts_at: Date
  bus_route_id: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const busRoute = await prisma.busRoute.findFirst({
    where: {
      id: params.id,
    },
    include: {
      itinerary: {
        include: {
          place_itinerary: {
            select: {
              is_access: true,
              section_number: true,
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

  function orderedByTimesTable(schedules: TimesTableProps[]): {
    ida: TimesTableProps[]
    volta: TimesTableProps[]
  } {
    const groupTimesTable: {
      ida: TimesTableProps[]
      volta: TimesTableProps[]
    } = {
      ida: [],
      volta: [],
    }

    for (const schedule of schedules) {
      if (schedule.direction === 'IDA') {
        groupTimesTable.ida.push(schedule)
      } else if (schedule.direction === 'VOLTA') {
        groupTimesTable.volta.push(schedule)
      }
    }

    // Ordenando os horários de ida
    groupTimesTable.ida.sort((a, b) => {
      const timeA = new Date(a.starts_at).getTime()
      const timeB = new Date(b.starts_at).getTime()

      return timeA - timeB
    })

    groupTimesTable.volta.sort((a, b) => {
      const timeA = new Date(a.starts_at).getTime()
      const timeB = new Date(b.starts_at).getTime()

      return timeA - timeB
    })

    return groupTimesTable
  }

  const unorderedTimesTable = orderedByTimesTable(busRoute?.timetable ?? [])

  return NextResponse.json({ busRoute, unorderedTimesTable })
}
