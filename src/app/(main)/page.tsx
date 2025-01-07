import { homeLinks } from "@/features/home/data/homeLinks"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <section className="md:py-60 py-16 px-8 grid place-items-center">
      <div className="space-y-16">
        <h1 className="text-7xl text-center font-bold text-shadow-lg shadow-black/30">
          GOSH!P GIRLS
        </h1>
        <div className="grid md:grid-cols-3 gap-16 place-items-center">
          {homeLinks.map(({ href, text, src }) => (
            <Link key={href} href={href}>
              <Image
                src={src}
                alt={text}
                width={300}
                height={300}
                className="rounded-full aspect-square card-up"
              />
              <div className="text-center text-xl font-semibold uppercase text-shadow shadow-black/30">
                {text}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
