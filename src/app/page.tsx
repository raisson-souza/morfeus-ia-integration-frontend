"use client"

import { AuthContextProvider } from "@/contexts/AuthContext"
import { theme } from "@/theme"
import { useState } from "react"
import Box from "@/components/base/Box"
import CustomButton from "@/components/customs/CustomButton"
import Header from "@/components/ScreenCustoms/header"
import Loading from "@/assets/loading"
import Screen from "@/components/base/Screen"

export default function ExternalHome() {
  const { login } = AuthContextProvider()
  const [ loading, setLoading ] = useState<boolean>(false)

  const enter = async () => {
    setLoading(true)
    await login()
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
              : <CustomButton
                msg="Entrar"
                onClick={async () => await enter()}
                color={ theme.quaternary }
                textColor={ theme.textColor }
                width="50%"
              />
          }
        </Box.Column>
      </Box.Column>
    </Screen>
  )
}