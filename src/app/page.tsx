"use client"

import { AuthContextProvider } from "@/contexts/AuthContext"
import Box from "@/components/base/Box"
import CustomButton from "@/components/customs/CustomButton"
import Header from "@/components/ScreenCustoms/header"
import Screen from "@/components/base/Screen"

export default function ExternalHome() {
  const { login } = AuthContextProvider()

  const enter = async () => {
    await login()
  }

  return (
    <Screen
      headerComponent={ <Header /> }
    >
      <Box.Column>
        <Box.Column>
          <h2>Realize a interpretação de seus sonhos com IA</h2>
          <h4>Interpretação com Psicanálise;</h4>
          <h4>Interpretação com Ontopsicologia;</h4>
          <h4>Geração de imagem descritiva do sonho;</h4>
          <h4>Transcrição de áudio em texto;</h4>
        </Box.Column>
        <CustomButton msg="Entrar" onClick={async () => await enter()} />
      </Box.Column>
    </Screen>
  )
}