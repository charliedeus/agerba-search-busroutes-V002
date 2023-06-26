import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { BusRouteProps } from '@/store/searchedBusRoutesStore'

interface ModalProps {
  busRoute: BusRouteProps
}

export default function Modal({ busRoute }: ModalProps) {
  return (
    <div className="fixed inset-0">
      <div className="fixed inset-0 flex items-center justify-center p-4 laptop:m-auto laptop:px-96 laptop:py-16">
        <Dialog.Panel className="flex h-full w-full flex-1 flex-col gap-4 rounded bg-white p-4">
          <div className="flex max-h-60 w-full flex-1 overflow-hidden rounded-md shadow-md">
            <Image
              src={
                busRoute.cover_url ||
                'https://images.unsplash.com/photo-1622522867204-35b68cb3d200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
              }
              width={390}
              height={585}
              alt=""
              className="flex-1 object-cover object-center blur-sm"
            />
          </div>
          <Dialog.Title className="flex items-center justify-between">
            <span className="font-semibold">Detalhes da Linha</span>
          </Dialog.Title>
          <Dialog.Description className="flex flex-col gap-2 text-sm">
            <>
              <label className="flex items-center gap-4">
                <span className="self-start font-bold text-zinc-400">
                  Número:{' '}
                </span>
                <p className="rounded-md bg-red-600 px-2 py-1 font-bold text-gray-50">
                  {busRoute?.bus_route_number}
                </p>
              </label>

              <label className="flex items-center gap-4">
                <span className="self-start font-bold text-zinc-400">
                  Descrição:{' '}
                </span>
                <p className="rounded-md px-2 py-1 font-bold text-zinc-950">
                  {busRoute?.name.toUpperCase()}
                </p>
              </label>

              <label className="flex items-center gap-4">
                <span className="self-start font-bold text-zinc-400">
                  Operador:{' '}
                </span>
                <p className="rounded-md px-2 py-1 font-bold text-zinc-950">
                  {busRoute?.operator.toUpperCase()}
                </p>
              </label>
            </>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </div>
  )
}
