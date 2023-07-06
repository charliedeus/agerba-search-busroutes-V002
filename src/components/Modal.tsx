import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { BusRouteProps } from '@/store/searchedBusRoutesStore'
import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import 'keen-slider/keen-slider.min.css'

dayjs.locale('pt-br')

interface TimesTableProps {
  id: string
  direction: string
  weekday: string
  starts_at: string
  bus_route_id: string
}

interface TimesTableState {
  ida: TimesTableProps[]
  volta: TimesTableProps[]
}

interface ModalProps {
  busRoute: BusRouteProps
  closeModal: () => void
}

export default function Modal({ busRoute, closeModal }: ModalProps) {
  const [timesTable, setTimesTable] = useState<TimesTableState>()

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
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

  useEffect(() => {
    const unorderedTimesTable = orderedByTimesTable(busRoute.timetable)
    setTimesTable(unorderedTimesTable)
  }, [busRoute])

  return (
    <div className="">
      <div className="fixed inset-0 flex items-center justify-center overflow-auto p-4 tablet:px-72 laptop:m-auto laptop:py-16">
        <Dialog.Panel className="flex h-full w-full flex-1 flex-col gap-4 rounded bg-zinc-100 p-4">
          <div className="relative flex max-h-[10rem] min-h-[10rem] w-full flex-1 resize-none overflow-hidden rounded-md shadow-md">
            <Image
              src={
                'https://images.unsplash.com/photo-1622522867204-35b68cb3d200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
              }
              width={390}
              height={585}
              alt=""
              className="flex-1 object-cover object-center "
            />

            <button
              onClick={closeModal}
              type="button"
              className="absolute right-4 top-4 cursor-pointer rounded-full bg-zinc-100 p-2"
            >
              <X className="h-6 w-6 text-zinc-950" />
            </button>
          </div>
          <Dialog.Title className="flex items-center justify-between">
            <span className="font-semibold">Detalhes da Linha</span>
          </Dialog.Title>
          <Dialog.Description className="flex flex-1 flex-col gap-2 overflow-hidden text-sm">
            <>
              <div className="flex w-full flex-col gap-2 laptop:flex-row">
                <label className="flex w-32 flex-col">
                  <span className="font-bold text-zinc-400">Número: </span>
                  <span className="w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-gray-50">
                    {busRoute?.busRouteNumber}
                  </span>
                </label>

                <label className="flex w-full flex-col">
                  <span className="font-bold text-zinc-400">Descrição: </span>
                  <span className="inline-block rounded-md py-1 font-bold text-zinc-950">
                    {busRoute?.name.toUpperCase()}
                  </span>
                </label>
              </div>

              {busRoute.operator && (
                <label className="flex flex-col">
                  <span className="font-bold text-zinc-400">Operador: </span>
                  <span className="inline-block rounded-md py-1 font-bold text-zinc-950">
                    {busRoute?.operator.toUpperCase()}
                  </span>
                </label>
              )}

              <label className="hidden laptop:inline">
                <span className="font-bold text-zinc-400">Itinerário: </span>
                <span className="inline-block rounded-md py-1 font-bold text-zinc-950">
                  {busRoute.itinerary
                    .map((item) => item.name.toUpperCase())
                    .join(', ')
                    .replace(/,(?=[^,]*$)/, ' e')}
                </span>
              </label>

              <div className="w-full flex-1 gap-4 overflow-y-scroll rounded-lg py-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-rounded-md laptop:hidden">
                {!!timesTable && (
                  <div
                    className="keen-slider w-full flex-1 py-4 laptop:hidden "
                    ref={sliderRef}
                  >
                    <div className="keen-slider__slide w-full">
                      <div className="flex w-full items-center gap-2 py-2">
                        <h1 className="flex flex-1 items-center justify-center font-bold">
                          SAÍDA: {busRoute.itinerary[0].name.toUpperCase()}
                        </h1>
                        <p className="flex animate-bounce items-center gap-2 text-[9px] laptop:hidden">
                          <ChevronsRight className="h-4 w-4" />{' '}
                        </p>
                      </div>

                      <div className="h-full pr-2">
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
                                {timesTable.ida.map((item) => {
                                  if (item.weekday === 'SEG') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.ida.map((item) => {
                                  if (item.weekday === 'TER') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.ida.map((item) => {
                                  if (item.weekday === 'QUA') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.ida.map((item) => {
                                  if (item.weekday === 'QUI') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.ida.map((item) => {
                                  if (item.weekday === 'SEX') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.ida.map((item) => {
                                  if (item.weekday === 'SAB') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.ida.map((item) => {
                                  if (item.weekday === 'DOM') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="keen-slider__slide w-full">
                      <div className="flex w-full items-center gap-2 py-2">
                        <p className="flex animate-bounce items-center gap-2 text-[9px] laptop:hidden">
                          <ChevronsLeft size={14} />
                        </p>
                        <h1 className="flex flex-1 items-center justify-center font-bold">
                          SAÍDA:{' '}
                          {busRoute.itinerary[
                            busRoute.itinerary.length - 1
                          ].name.toUpperCase()}
                        </h1>
                        <p className="flex animate-bounce items-center gap-2 text-[9px] laptop:hidden">
                          <ChevronsRight size={14} />
                        </p>
                      </div>

                      <div className="h-full max-h-72 min-h-[18rem] overflow-y-scroll pr-2 shadow-xl">
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
                                {timesTable.volta.map((item) => {
                                  if (item.weekday === 'SEG') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.volta.map((item) => {
                                  if (item.weekday === 'TER') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.volta.map((item) => {
                                  if (item.weekday === 'QUA') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.volta.map((item) => {
                                  if (item.weekday === 'QUI') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.volta.map((item) => {
                                  if (item.weekday === 'SEX') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.volta.map((item) => {
                                  if (item.weekday === 'SAB') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                              <td className="mx-auto box-border h-full align-top text-xs">
                                {timesTable.volta.map((item) => {
                                  if (item.weekday === 'DOM') {
                                    const formattedTime = dayjs(
                                      item.starts_at,
                                    ).format('HH:mm')
                                    return (
                                      <span
                                        className="flex flex-1 items-center justify-center font-mono"
                                        key={item.id}
                                      >
                                        {formattedTime}
                                      </span>
                                    )
                                  } else {
                                    return null // Adicionando um retorno padrão quando a condição não é atendida
                                  }
                                })}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="keen-slider__slide w-full">
                      <div className="flex w-full items-center gap-2 py-2">
                        <p className="flex animate-bounce items-center gap-2 text-[9px] laptop:hidden">
                          <ChevronsLeft size={14} />
                        </p>
                        <h1 className="flex flex-1 items-center justify-center font-bold">
                          ITINERÁRIO
                        </h1>
                      </div>
                      <div className="h-full max-h-72 min-h-[18rem] overflow-y-scroll pr-2 shadow-xl">
                        <span className="inline-block rounded-md py-1 font-bold text-zinc-950">
                          {busRoute.itinerary
                            .map((item) => item.name.toUpperCase())
                            .join(', ')
                            .replace(/,(?=[^,]*$)/, ' e')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!!timesTable && (
                <div className="hidden w-full flex-1 gap-4 overflow-y-scroll rounded-lg py-4 scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-rounded-md laptop:inline-flex">
                  <div className="relative flex w-full flex-col">
                    <div className="flex w-full grow items-center gap-2 py-2">
                      <h1 className="flex flex-1 items-center justify-center font-bold">
                        SAÍDA: {busRoute.itinerary[0].name.toUpperCase()}
                      </h1>
                      <p className="flex animate-bounce items-center gap-2 text-[9px] laptop:hidden">
                        <ChevronsRight className="h-4 w-4" />{' '}
                      </p>
                    </div>

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
                              {timesTable.ida.map((item) => {
                                if (item.weekday === 'SEG') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.ida.map((item) => {
                                if (item.weekday === 'TER') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.ida.map((item) => {
                                if (item.weekday === 'QUA') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.ida.map((item) => {
                                if (item.weekday === 'QUI') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.ida.map((item) => {
                                if (item.weekday === 'SEX') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.ida.map((item) => {
                                if (item.weekday === 'SAB') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.ida.map((item) => {
                                if (item.weekday === 'DOM') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex w-full flex-col">
                    <div className="flex w-full items-center gap-2 py-2">
                      <p className="flex animate-bounce items-center gap-2 text-[9px] laptop:hidden">
                        <ChevronsLeft size={14} />
                      </p>
                      <h1 className="flex flex-1 items-center justify-center font-bold">
                        SAÍDA:{' '}
                        {busRoute.itinerary[
                          busRoute.itinerary.length - 1
                        ].name.toUpperCase()}
                      </h1>
                    </div>
                    <div className="h-full max-h-[21rem]">
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
                              {timesTable.volta.map((item) => {
                                if (item.weekday === 'SEG') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.volta.map((item) => {
                                if (item.weekday === 'TER') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.volta.map((item) => {
                                if (item.weekday === 'QUA') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.volta.map((item) => {
                                if (item.weekday === 'QUI') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.volta.map((item) => {
                                if (item.weekday === 'SEX') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.volta.map((item) => {
                                if (item.weekday === 'SAB') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                            <td className="mx-auto box-border h-full align-top text-xs">
                              {timesTable.volta.map((item) => {
                                if (item.weekday === 'DOM') {
                                  const formattedTime = dayjs(
                                    item.starts_at,
                                  ).format('HH:mm')
                                  return (
                                    <span
                                      className="flex flex-1 items-center justify-center font-mono"
                                      key={item.id}
                                    >
                                      {formattedTime}
                                    </span>
                                  )
                                } else {
                                  return null // Adicionando um retorno padrão quando a condição não é atendida
                                }
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </div>
  )
}
