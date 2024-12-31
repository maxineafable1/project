import ProfileLayoutLinks from "@/features/profile/components/ProfileLayoutLinks"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-16">
      <ProfileLayoutLinks />
      {children}
    </section>
  )
}
