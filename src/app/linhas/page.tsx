import { SearchBusRouteForm } from '@/components/SearchBusRouteForm'
import { Home } from 'lucide-react'
import Link from 'next/link'

export default async function Linhas() {
  return (
    <main className="flex h-full w-full flex-col gap-4 px-8 py-4">
      <header className="flex items-center justify-between">
        <Link href={'/'} className="rounded-full bg-zinc-50 p-4 shadow-lg">
          <Home className="h-4 w-4" />
        </Link>
      </header>

      <SearchBusRouteForm />
    </main>
  )
}
