import { ArrowDownUp } from 'lucide-react'
import { InputTextSearch } from './InputTextSearch'

export default function SearchBusRouteForm() {
  return (
    <form
      action=""
      className="overflow-hidden rounded-lg bg-zinc-100 px-3 py-6"
    >
      <div className="relative flex flex-col items-center justify-center gap-1">
        <InputTextSearch label="Origem" />
        <InputTextSearch label="Destino" />

        <button className="absolute right-0 rounded-full bg-zinc-50 p-4 focus:outline-none">
          <ArrowDownUp className="h-6 w-6" />
        </button>
      </div>
    </form>
  )
}
