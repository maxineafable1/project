import { homeLinks } from "@/features/home/data/homeLinks"
import Link from "next/link"

export default function Home() {
  return (
    <section className="md:py-60 py-16 px-8 grid place-items-center">
      <div className="space-y-16">
        <h1 className="text-7xl text-center font-bold text-shadow-lg shadow-black/30">
          GOSH!P GIRLS
        </h1>
        <div className="grid md:grid-cols-3 gap-16 *:w-60 place-items-center">
          {homeLinks.map(({ href, text }) => (
            <Link
              key={href}
              href={href}
              className="
                block bg-neutral-400 rounded-full aspect-square card-up
              "
            ></Link>
          ))}
        </div>
      </div>
    </section>
  )
}
