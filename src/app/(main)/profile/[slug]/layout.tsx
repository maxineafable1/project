import ProfileLayoutLinks from "@/features/profile/components/ProfileLayoutLinks"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <ProfileLayoutLinks />
      {children}
    </section>
  )
}
