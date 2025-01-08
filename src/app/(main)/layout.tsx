import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/global/Navbar";
import BgImage from "@/components/global/BgImage";
import { raleway } from "@/lib/fonts";
 
export const metadata: Metadata = {
  title: "GOSH!P GIRLS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${raleway.variable} antialiased
          font-raleway text-neutral-100 min-h-dvh
        `}
      >
        <BgImage>
          <Navbar />
          <main>
            {children}
          </main>
        </BgImage>
      </body>
    </html>
  );
}
