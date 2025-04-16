"use client"

import { AuthContextProvider } from "@/contexts/AuthContext"
import { LocalStorage } from "@/config/LocalStorage"
import { theme } from "@/theme"
import { useState } from "react"
import Box from "@/components/base/Box"
import CustomButton from "@/components/customs/CustomButton"
import Header from "@/components/ScreenCustoms/header"
import Loading from "@/assets/loading"
import Screen from "@/components/base/Screen"

export default function ExternalHome() {
  const { login, logoff } = AuthContextProvider()
  const [ loading, setLoading ] = useState<boolean>(false)

  const renderEnterBtns = () => {
    const apiToken = LocalStorage.apiToken.get()

    if (apiToken) {
      return <>
        <CustomButton
          msg="Entrar"
          onClick={async () => await enterAgain()}
          color={ theme.quaternary }
          textColor={ theme.textColor }
          width="50%"
        />
        <CustomButton
          msg="Entrar como novo usuário"
          onClick={async () => await enterAsNew()}
          color={ theme.terciary }
          textColor={ theme.textColor }
          width="50%"
        />
      </>
    }

    return <CustomButton
      msg="Entrar"
      onClick={async () => await enterAsNew()}
      color={ theme.quaternary }
      textColor={ theme.textColor }
      width="50%"
    />
  }

  const enterAgain = async () => {
    setLoading(true)
    await login()
      .finally(() => setLoading(false))
  }

  const enterAsNew = async () => {
    setLoading(true)
    await logoff()
      .finally(() => setLoading(false))
  }

  return (
    <Screen headerComponent={ <Header /> }>
      <Box.Column
        style={{
          backgroundColor: theme.secondary,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box.Column
          style={{
            width: "80%",
            color: theme.textColor,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Box.Column
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <h2>Realize a interpretação de seus sonhos com IA.</h2>
            <h4>Interpretação com Psicanálise;</h4>
            <h4>Interpretação com Ontopsicologia;</h4>
            <h4>Geração de imagem descritiva do sonho;</h4>
            <h4>Transcrição de áudio em texto;</h4>
          </Box.Column>
          {
            loading
              ? <Loading />
              : renderEnterBtns()
          }
        </Box.Column>
      </Box.Column>
    </Screen>
  )
}