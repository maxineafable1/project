import type { Metadata } from "next";
import "../globals.css";
import { raleway } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          ${raleway.variable} font-raleway antialiased
          flex flex-col justify-center items-center min-h-dvh
          bg-[url('/bg/home-bg.png')]
          bg-center bg-cover bg-no-repeat
        `}
      >
        {children}
      </body>
    </html>
  );
}