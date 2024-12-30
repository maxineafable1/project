import { videoLinks } from "@/features/group/data/videoLinks"
import Link from "next/link"

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="max-w-screen-xl mx-auto my-16 px-4">
      <header>
        <ul className="flex items-center uppercase justify-between text-2xl font-semibold">
          {videoLinks.map((link) => (
            <Link
              key={link.href}
              href={`/group/${link.href}`}
              className="underline-link"
            >
              {link.text}
            </Link>
          ))}
        </ul>
      </header>
      {children}
    </section>
  )
}
