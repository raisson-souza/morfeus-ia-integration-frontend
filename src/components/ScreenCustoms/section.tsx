"use client"

import { InterpretationListed } from "@/types/interpretation"
import { theme } from "@/theme"
import Box from "../base/Box"
import React, { Dispatch, SetStateAction } from "react"

type SectionProps = {
    interpretations: InterpretationListed[]
    loading: boolean
    setInterpretationId: Dispatch<SetStateAction<number | null>>
    setIsCreating: Dispatch<SetStateAction<boolean>>
}

export default function Section({
    interpretations,
    loading,
    setInterpretationId,
    setIsCreating,
}: SectionProps) {
    const parseDate = (date: string) => {
        try {
            const parsedDate = date.replace("-03:00", "").split(".")[0].split("T")[0].split("-")
            const parsedTime = date.replace("-03:00", "").split(".")[0].split("T")[1]
            return `${ parsedDate[2] }/${ parsedDate[1] }/${ parsedDate[0] } ${ parsedTime }`
        }
        catch {
            return "---"
        }
    }

    const redirectToInterpretation = (id: number) => {
        setInterpretationId(id)
        setIsCreating(false)
    }

    const renderInterpretations = () => {
        if (interpretations.length === 0)
            return <p>Nenhuma interpretação realizada.</p>

        return interpretations.map((interpretation, i) => (
            <Box.Row
                onClick={() => redirectToInterpretation(interpretation.id)}
                key={ i }
            >
                <p style={{
                    color: theme.textColor,
                }}>{ interpretation.title }</p>
                <p style={{
                    color: theme.textColor,
                }}>{ parseDate(interpretation.createdAt) }</p>
            </Box.Row>
        ))
    }

    return <Box.Column
        style={{
            backgroundColor: theme.primary,
            width: "100%",
        }}
    >
        <h2 style={{
            color: theme.textColor
        }}>Seus Sonhos</h2>
        <Box.Column>
            {
                loading
                    ? <p>Carregando interpretações...</p>
                    : renderInterpretations()
            }
        </Box.Column>
    </Box.Column>
}