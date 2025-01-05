import GroupLayoutLinks from "@/features/group/components/GroupLayoutLinks"

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="max-w-screen-2xl mx-auto py-16 px-4">
      <header>
        <GroupLayoutLinks />
      </header>
      {children}
    </section>
  )
}
