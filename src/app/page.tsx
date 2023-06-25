import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import logoImg from '../assets/logo-white.png'
import Link from 'next/link'

export default async function Home() {
  return (
    <main className="relative inset-0 flex h-full w-full">
      <Image
        src={'/bg-02.jpg'}
        alt=""
        width={390}
        height={844}
        className="flex object-cover object-center"
      />

      <div className="absolute inset-0 mt-auto flex h-1/2 flex-col justify-between gap-4 p-8">
        <Image src={logoImg} alt="" width={120} />

        <p className="text-base text-zinc-100">
          Planeje suas viagens com facilidade! Nosso aplicativo permite que você
          pesquise horários atualizados das linhas de transporte, garantindo que
          você chegue ao seu destino no tempo certo. Simplifique sua jornada com
          nossa ferramenta intuitiva. Consulte agora e viaje informado!
        </p>

        <Link
          href={'/linhas'}
          className="flex items-center justify-between gap-2 rounded-md bg-zinc-50 px-4 py-3"
        >
          Buscar linhas
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  )
}
