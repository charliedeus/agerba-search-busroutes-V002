import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import logoImg from '../assets/logo-white.png'
import Link from 'next/link'

export default async function Home() {
  return (
    <main className="relative inset-0 flex h-screen w-full">
      <div className="relative flex h-full w-full">
        <Image
          src={'/bg-02.jpg'}
          alt=""
          width={390}
          height={844}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="absolute inset-0 z-20 mt-auto flex h-1/2 flex-col justify-between gap-4 p-8 laptop:w-3/4 laptop:justify-normal laptop:gap-12">
        <Image src={logoImg} alt="" className="w-32 laptop:w-56" />

        <p className="text-base text-zinc-100 laptop:text-xl">
          Planeje suas viagens com facilidade! Nosso aplicativo permite que você
          pesquise horários atualizados das linhas de transporte, garantindo que
          você chegue ao seu destino no tempo certo. Simplifique sua jornada com
          nossa ferramenta intuitiva. Consulte agora e viaje informado!
        </p>

        <Link
          href={'/linhas'}
          className="flex items-center justify-between gap-2 rounded-md bg-zinc-50 px-4 py-3 laptop:w-1/2"
        >
          <span className="font-bold text-zinc-950">Consultar</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  )
}
