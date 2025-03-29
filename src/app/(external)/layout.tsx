import "../globals.css"
import InitialContextComponent from "@/contexts/InitialContexts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Template Web - EXTERNAL",
  description: "Developed by Raisson",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element
}>) {
  return (
    <html lang="pt-br">
      <body>
          <InitialContextComponent>
            { children }
          </InitialContextComponent>
      </body>
    </html>
  )
}