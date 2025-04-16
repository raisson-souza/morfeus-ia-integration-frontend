"use client"

import { InterpretationListed } from "@/types/interpretation"
import { theme } from "@/theme"
import Box from "../base/Box"
import Loading from "@/assets/loading"
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
            <Box.Column
                onClick={() => redirectToInterpretation(interpretation.id)}
                key={ i }
                style={{
                    borderBottom: "1px solid white",
                    cursor: "pointer",
                }}
            >
                <p
                    style={{
                        color: theme.textColor,
                    }}
                >
                    { interpretation.title }
                </p>
                <p
                    style={{
                        color: theme.textColor,
                        fontSize: 12,
                    }}
                >
                    { parseDate(interpretation.createdAt) }
                </p>
            </Box.Column>
        ))
    }

    return <Box.Column
        style={{
            backgroundColor: theme.primary,
            width: "100%",
            paddingTop: 5,
        }}
    >
        <h2
            style={{
                color: theme.textColor,
                paddingLeft: 5,
            }}
        >
            Seus Sonhos
        </h2>
        <Box.Column
            style={{
                gap: 5,
                paddingTop: 10,
            }}
        >
            {
                loading
                    ? <Loading />
                    : renderInterpretations()
            }
        </Box.Column>
    </Box.Column>
}