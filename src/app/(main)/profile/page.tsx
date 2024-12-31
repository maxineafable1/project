import ProfilesPage from "@/features/profile/components/ProfilesPage"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | GOSH!P GIRLS",
};

export default function page() {
  return (
    <ProfilesPage />
  )
}
