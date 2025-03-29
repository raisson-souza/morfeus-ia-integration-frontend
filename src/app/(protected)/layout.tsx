import "../globals.css"
import Auth from "@/components/base/Auth"
import AuthContextComponent from "@/contexts/AuthContext"
import InitialContextComponent from "@/contexts/InitialContexts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Template Web - ADM",
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
              <AuthContextComponent>
                <Auth>
                    { children }
                </Auth>
              </AuthContextComponent>
            </InitialContextComponent>
        </body>
      </html>
    )
}