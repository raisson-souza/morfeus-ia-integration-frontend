"use client"

import { useState } from "react"
import Box from "@/components/base/Box"
import CustomButton from "@/components/customs/CustomButton"
import CustomModal from "@/components/customs/CustomModal"
import Screen from "@/components/base/Screen"

export default function Error(error: any) {
    const [ open, setOpen ] = useState<boolean>(false)

    return (
        <Screen>
            <Box.Column>
                <h1>Ocorreu um erro, atualize a página.</h1>
                <h4>{ error.error.message }</h4>
                <CustomButton
                    msg="Detalhes"
                    tooltipMsg="Visualizar detalhes do caminho do erro"
                    onClick={ () => setOpen(true) }
                />
            </Box.Column>
            <CustomModal
                open={ open }
                setOpen={ setOpen }
            >
                <p>{ error.error.stack }</p>
            </CustomModal>
        </Screen>
    )
}