"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { theme } from "@/theme"
import Box from "../base/Box"
import CustomButton from "../customs/CustomButton"
import InterpretationService from "@/services/api/InterpretationService"
import Loading from "@/assets/loading"

type CreatingInterpretationProps = {
    setInterpretationId: Dispatch<SetStateAction<number | null>>
    setIsCreating: Dispatch<SetStateAction<boolean>>
    fetchAllInterpretations: () => Promise<void>
}

export default function CreatingInterpretation({
    setInterpretationId,
    setIsCreating,
    fetchAllInterpretations,
}: CreatingInterpretationProps) {
    const [ dreamTitle, setDreamTitle ] = useState<string>("")
    const [ dreamDescription, setDreamDescription ] = useState<string>("")
    const [ creating, setCreating ] = useState<boolean>(false)

    const createDreamDescription = async () => {
        setCreating(true)
        await InterpretationService.CreateInterpretation(dreamTitle, dreamDescription)
            .then(async (response) => {
                if (response.Success) {
                    await fetchAllInterpretations()
                    setInterpretationId(response.Data.id)
                    setIsCreating(false)
                    return
                }
                alert(response.ErrorMessage)
            })
            .finally(() => setCreating(false))
    }

    return <Box.Column
        style={{
            backgroundColor: theme.secondary,
            width: "100%",
        }}
    >
        <Box.Column
            style={{
                width: "80%",
                alignSelf: "center",
                marginTop: 30,
                padding: 20,
                borderRadius: 15,
                backgroundColor: theme.terciary,
                gap: 10,
            }}
        >
            <h1 style={{ color: theme.textColor }}>Descreva seu sonho.</h1>
            <h3 style={{ color: theme.textColor }}>Receba duas interpretações e uma imagem descritiva de uma IA!</h3>
            <input
                type="text"
                placeholder="Título do Sonho..."
                value={dreamTitle}
                onChange={(e) => setDreamTitle(e.target.value)}
                style={{
                    background: theme.quaternary,
                    color: theme.textColor,
                    height: 30,
                }}
            />
            <input
                type="text"
                autoFocus
                placeholder="Sonhei que estava..."
                value={dreamDescription}
                onChange={(e) => setDreamDescription(e.target.value)}
                style={{
                    background: theme.quaternary,
                    color: theme.textColor,
                    height: 30,
                }}
            />
            {
                creating
                    ? <Box.Center style={{ alignSelf: "center", paddingTop: 20 }}>
                        <Loading />
                    </Box.Center>
                    : <>
                        <CustomButton
                            msg="CRIAR INTERPRETAÇÃO"
                            onClick={async () => await createDreamDescription()}
                            color={ theme.quaternary }
                            textColor={ theme.textColor }
                        />
                        <CustomButton
                            msg="Descrever Sonho por Áudio"
                            color={ theme.quaternary }
                            textColor={ theme.textColor }
                        />
                    </>
            }
        </Box.Column>
    </Box.Column>
}