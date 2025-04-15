"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Interpretation } from "@/types/interpretation"
import { theme } from "@/theme"
import Box from "../base/Box"
import CustomButton from "../customs/CustomButton"
import env from "@/config/env"
import InterpretationService from "@/services/api/InterpretationService"
import ReactMarkdown from 'react-markdown'

type SelectedInterpretationProps = {
    interpretationId: number
    setIsCreating: Dispatch<SetStateAction<boolean>>
}

export default function SelectedInterpretation({
    interpretationId,
    setIsCreating,
}: SelectedInterpretationProps) {
    const [ interpretation, setInterpretation ] = useState<Interpretation | null>(null)
    const [ loading, setLoading ] = useState<boolean>(true)

    const fetchInterpretation = async () => {
        setLoading(true)
        await InterpretationService.GetInterpretation(interpretationId)
            .then(response => {
                if (response.Success) {
                    setInterpretation(response.Data)
                    return
                }
                alert(response.ErrorMessage)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchInterpretation()
    }, [interpretationId])

    const renderMessage = (
        msg: string | null,
        title: string | null,
        side: "user" | "ai"
    ) => {
        if (!msg) return <></>

        const customStyle = side === "user"
            ? {
                backgroundColor: theme.terciary,
                alignSelf: "flex-end",
                marginRight: 20,
                padding: 10,
                borderTopLeftRadius: 15,
            }
            : {
                backgroundColor: theme.quaternary,
                alignSelf: "flex-start",
                marginLeft: 20,
                paddingLeft: 26, // Correção do markdown
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                borderTopRightRadius: 15,
            }

        return <Box.Column
            style={{
                color: "white",
                width: "75%",
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                ...customStyle,
            }}
        >
            {
                title
                    ? <h3 style={{
                        color: theme.textColor,
                    }}>{ title }</h3>
                    : <></>
            }
            <ReactMarkdown >{ msg }</ReactMarkdown>
        </Box.Column>
    }

    const imagePath = (interpretation?.imagePath ?? null)
        ? `${ env.BackendUrl().replace("api", "") }${ interpretation!.imagePath }.png`
        : null

    return <Box.Column
        style={{
            backgroundColor: theme.secondary,
        }}
    >
        {
            loading
                ? <h2>Carregando...</h2>
                : <Box.Column
                    style={{
                        paddingTop: 15,
                        gap: 10,
                    }}
                >
                    { renderMessage(interpretation!.dream, interpretation!.title, "user") }
                    { renderMessage(interpretation!.dreamOntopsychologyInterpretation, "Interpretação Ontopsicológica", "ai") }
                    { renderMessage(interpretation!.dreamPsychoanalysisInterpretation, "Interpretação Psicanalística", "ai") }
                    {
                        imagePath
                            ? <img
                                src={ imagePath }
                                width={200}
                                height={200}
                            />
                            : <></>
                    }
                    <CustomButton
                        msg="Criar Nova Interpretação"
                        onClick={() => setIsCreating(true)}
                    />
                </Box.Column>
        }
    </Box.Column>
}