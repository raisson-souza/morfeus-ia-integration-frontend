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

        return <Box.Column
            style={{
                color: "white",
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
        <CustomButton
            msg="Criar Nova Interpretação"
            onClick={() => setIsCreating(true)}
        />
        {
            loading
                ? <h2>Carregando...</h2>
                : <Box.Column>
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
                </Box.Column>
        }
    </Box.Column>
}