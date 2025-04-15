"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Interpretation } from "@/types/interpretation"
import { theme } from "@/theme"
import Box from "../base/Box"
import CustomButton from "../customs/CustomButton"
import env from "@/config/env"
import InterpretationService from "@/services/api/InterpretationService"
import Loading from "@/assets/loading"
import ReactMarkdown from 'react-markdown'

type RenderMessageProps = {
    children: JSX.Element
    title: string
    side: "user" | "ai"
    hasMdPaddingFix?: boolean
}

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

    const RenderMessage = ({
        children,
        title,
        side,
        hasMdPaddingFix = false,
    }: RenderMessageProps) => {
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
                paddingLeft: hasMdPaddingFix ? 26 : 10,
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
                gap: 10,
                ...customStyle,
            }}
        >
            <h2
                style={{
                    color: theme.textColor,
                }}
            >
                { title }
            </h2>
            { children }
        </Box.Column>
    }

    const imagePath = (interpretation?.imagePath ?? null)
        ? `${ env.BackendUrl().replace("api", "") }${ interpretation!.imagePath }.png`
        : null

    return <Box.Column
        style={{
            backgroundColor: theme.secondary,
            width: "100%",
        }}
    >
        {
            loading
                ? <Box.Center
                    style={{
                        width: "100%",
                        alignSelf: "center",
                        paddingTop: 60,
                    }}
                >
                    <Loading />
                </Box.Center>
                : <Box.Column
                    style={{
                        paddingTop: 15,
                        paddingBottom: 15,
                        gap: 10,
                    }}
                >
                    <RenderMessage
                        title={ `Sonho "${ interpretation?.title }"` }
                        side="user"
                    >
                        <p>{ interpretation?.dream }</p>
                    </RenderMessage>
                    <RenderMessage
                        title="Interpretação Ontopsicológica"
                        side="ai"
                        hasMdPaddingFix
                    >
                        <ReactMarkdown>{ interpretation?.dreamOntopsychologyInterpretation }</ReactMarkdown>
                    </RenderMessage>
                    <RenderMessage
                        title="Interpretação Psicanalítica"
                        side="ai"
                        hasMdPaddingFix
                    >
                        <ReactMarkdown>{ interpretation?.dreamPsychoanalysisInterpretation }</ReactMarkdown>
                    </RenderMessage>
                    <RenderMessage
                        title="Imagem Descritiva do Sonho"
                        side="ai"
                    >
                        {
                            imagePath
                                ? <img
                                    src={ imagePath }
                                    width={400}
                                    height={400}
                                />
                                : <p>Não foi possível gerar a imagem.</p>
                        }
                    </RenderMessage>
                    <RenderMessage
                        title=""
                        side="user"
                    >
                        <CustomButton
                            msg="Criar Nova Interpretação"
                            onClick={() => setIsCreating(true)}
                            color={ theme.textColor }
                        />
                    </RenderMessage>
                </Box.Column>
        }
    </Box.Column>
}