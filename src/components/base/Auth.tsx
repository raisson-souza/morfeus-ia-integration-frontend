"use client"

import { AuthContextProvider } from "../../contexts/AuthContext"
import { redirect } from "next/navigation"
import { useLayoutEffect } from "react"

type AuthRouteProps = {
    children: JSX.Element | JSX.Element[]
}

export default function AuthRoute({ children }: AuthRouteProps) {
    const { isLogged } = AuthContextProvider()

    useLayoutEffect(() => {
        if (!isLogged) {
            redirect("/")
        }
    }, [])

    if (!isLogged) {
        return null
    }

    return children
}