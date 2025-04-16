"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { LocalStorage } from "@/config/LocalStorage"
import { useRouter } from "next/navigation"
import AuthService from "@/services/api/AuthService"
import Screen from "@/components/base/Screen"

type AuthContextProps = {
    children: JSX.Element | JSX.Element[]
}

type AuthContext = {
    isLogged: boolean
    /** Usando com o hook useTransition, pode não realizar um refresh no componente se necessário */
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    /** Função para login */
    login: () => Promise<void>
    /** Função para logoff */
    logoff: () => Promise<void>
}

const AuthContext = createContext<AuthContext | null>(null)

/** Context de autenticação, realiza o refresh do token de autenticação e valida credenciais no localStorage */
export default function AuthContextComponent({ children }: AuthContextProps) {
    const router = useRouter()
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ isLogged, setIsLogged ] = useState<boolean>(false)

    const manageAuth = () => {
        const token = LocalStorage.apiToken.get()

        if (token) {
            setIsLogged(true)
            router.push("/home")
        }

        setLoading(false)
    }

    useEffect(() => {
        manageAuth()
    }, [])

    const login = async (): Promise<void> => {
        const apiToken = LocalStorage.apiToken.get()

        if (apiToken) {
            setIsLogged(true)
            LocalStorage.apiToken.set(apiToken)
            router.push("/home")
            return
        }

        setLoading(true)
        await AuthService.DirectAccess()
            .then(response => {
                if (response.Success) {
                    setIsLogged(true)
                    LocalStorage.apiToken.set(response.Data)
                    router.push("/home")
                    return
                }
                alert(response.ErrorMessage)
            })
            .finally(() => setLoading(false))
    }

    const logoff = async (): Promise<void> => {
        LocalStorage.apiToken.remove()
        await login()
            .finally(() => router.push("/"))
    }

    if (loading) {
        return (
            <Screen>
                <h3>Carregando...</h3>
            </Screen>
        )
    }

    return (
        <AuthContext.Provider value={{
            isLogged,
            setIsLogged,
            login,
            logoff,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export function AuthContextProvider() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("AuthContext chamado fora do provider.")
    return context
}