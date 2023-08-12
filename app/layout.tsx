import { Nunito } from "next/font/google";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone"
}

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={font.className}>
        <ClientOnly>
          <Navbar />
          <ToasterProvider />
          <RegisterModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
