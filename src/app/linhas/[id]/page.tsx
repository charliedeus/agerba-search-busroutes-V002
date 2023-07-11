import axios from 'axios'
import dayjs from 'dayjs'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

dayjs.locale('pt-br')

interface BusRouteParams {
  params: {
    id: string
  }
}

export default async function BusRoute({ params }: BusRouteParams) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/linhas/search_by_id/${params.id}`,
  )
  const { busRoute, unorderedTimesTable } = data

  const itineraries = busRoute.itinerary[0].place_itinerary.map(
    (item: {
      is_access: boolean
      section_number: number
      place: { id: string; name: string }
    }) => {
      return {
        section_number: item.section_number,
        name: item.place.name,
      }
    },
  )

  return (
    <main className="flex h-full w-full flex-col gap-4 px-8 py-4">
      <header className="flex items-center justify-between">
        <Link
          href={'/linhas'}
          className="rounded-full bg-zinc-50 p-4 shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </header>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex h-[10rem] max-h-[10rem] overflow-hidden rounded-md bg-red-300 shadow-md">
          <Image
            src={
              'https://images.unsplash.com/photo-1622522867204-35b68cb3d200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
            }
            width={390}
            height={585}
            alt=""
            className="flex-1 object-cover object-center"
          />
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <header className="text-lg font-semibold">Detalhes da Linha</header>

          <div className="flex flex-col gap-4 laptop:flex-row">
            <div className="flex flex-col gap-1 laptop:gap-2">
              <label className="font-medium text-zinc-500">Número:</label>
              <span className="w-fit rounded-lg bg-red-500 p-2 font-bold">
                {busRoute?.bus_route_number}
              </span>
            </div>

            <div className="flex flex-col gap-1 laptop:gap-2">
              <label className="font-medium text-zinc-500">Descrição:</label>
              <span className="font-bold laptop:py-2">{busRoute?.name}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 laptop:gap-2">
            <label className="font-medium text-zinc-500">Operador:</label>
            <span className="font-bold">{busRoute?.operator}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-zinc-500">Itinerário:</label>
            <span className="inline-block rounded-md py-1 font-bold text-zinc-950">
              {itineraries
                .map((item: { id: string; name: string }) =>
                  item.name.toUpperCase(),
                )
                .join(', ')
                .replace(/,(?=[^,]*$)/, ' e')}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-4 laptop:flex-row">
            <div className="flex flex-1 flex-col items-center gap-2">
              <h1 className="flex flex-1 items-center justify-center font-bold">
                SAÍDA: {itineraries[0].name.toUpperCase()}
              </h1>
              <div className="h-full">
                <table className="w-full table-fixed border-spacing-1 text-sm">
                  <thead>
                    <tr className="">
                      <th className="rounded-sm bg-zinc-500">SEG</th>
                      <th className="rounded-sm bg-zinc-500">TER</th>
                      <th className="rounded-sm bg-zinc-500">QUA</th>
                      <th className="rounded-sm bg-zinc-500">QUI</th>
                      <th className="rounded-sm bg-zinc-500">SEX</th>
                      <th className="rounded-sm bg-zinc-500">SÁB</th>
                      <th className="rounded-sm bg-zinc-500">DOM</th>
                    </tr>
                  </thead>

                  <div className="h-2" />

                  <tbody>
                    <tr>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.ida.map((item: any) => {
                          if (item.weekday === 'SEG') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.ida.map((item: any) => {
                          if (item.weekday === 'TER') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.ida.map((item: any) => {
                          if (item.weekday === 'QUA') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.ida.map((item: any) => {
                          if (item.weekday === 'QUI') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.ida.map((item: any) => {
                          if (item.weekday === 'SEX') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.ida.map((item: any) => {
                          if (item.weekday === 'SAB') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.ida.map((item: any) => {
                          if (item.weekday === 'DOM') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4 flex flex-1 flex-col gap-2">
              <h1 className="flex flex-1 items-center justify-center text-center font-bold">
                SAÍDA: {itineraries[itineraries.length - 1].name.toUpperCase()}
              </h1>
              <div className="h-full">
                <table className="w-full table-fixed border-spacing-1 text-sm">
                  <thead>
                    <tr className="">
                      <th className="rounded-sm bg-zinc-500">SEG</th>
                      <th className="rounded-sm bg-zinc-500">TER</th>
                      <th className="rounded-sm bg-zinc-500">QUA</th>
                      <th className="rounded-sm bg-zinc-500">QUI</th>
                      <th className="rounded-sm bg-zinc-500">SEX</th>
                      <th className="rounded-sm bg-zinc-500">SÁB</th>
                      <th className="rounded-sm bg-zinc-500">DOM</th>
                    </tr>
                  </thead>

                  <div className="h-2" />

                  <tbody>
                    <tr>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.volta.map((item: any) => {
                          if (item.weekday === 'SEG') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.volta.map((item: any) => {
                          if (item.weekday === 'TER') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.volta.map((item: any) => {
                          if (item.weekday === 'QUA') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.volta.map((item: any) => {
                          if (item.weekday === 'QUI') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.volta.map((item: any) => {
                          if (item.weekday === 'SEX') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.volta.map((item: any) => {
                          if (item.weekday === 'SAB') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className="mx-auto box-border h-full align-top text-xs">
                        {unorderedTimesTable.volta.map((item: any) => {
                          if (item.weekday === 'DOM') {
                            const formattedTime = dayjs(item.starts_at).format(
                              'HH:mm',
                            )
                            return (
                              <span
                                className="flex flex-1 items-center justify-center font-mono transition hover:bg-blue-900 hover:text-zinc-50"
                                key={item.id}
                              >
                                {formattedTime}
                              </span>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
