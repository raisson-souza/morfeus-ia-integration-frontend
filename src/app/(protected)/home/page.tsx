"use client"

import { InterpretationListed } from "@/types/interpretation"
import { useEffect, useState } from "react"
import CreatingInterpretation from "@/components/CreatingInterpretation"
import Header from "@/components/ScreenCustoms/header"
import InterpretationService from "@/services/api/InterpretationService"
import Screen from "@/components/base/Screen"
import Section from "@/components/ScreenCustoms/section"
import SelectedInterpretation from "@/components/SelectedInterpretation"

export default function InternalHome() {
    const [ interpretationList, setInterpretationList ] = useState<InterpretationListed[]>([])
    const [ loadingInterpretationList, setLoadingInterpretationList ] = useState<boolean>(true)
    const [ interpretationId, setInterpretationId ] = useState<number | null>(null)
    const [ isCreating, setIsCreating ] = useState<boolean>(true)

    const fetchAllInterpretations = async () => {
        setLoadingInterpretationList(true)
        await InterpretationService.ListInterpretation()
            .then(response => {
                if (response.Success) {
                    setInterpretationList(response.Data)
                    return
                }
                alert(response.ErrorMessage)
            })
            .finally(() => setLoadingInterpretationList(false))
    }

    useEffect(() => {
        fetchAllInterpretations()
    }, [])

    return <Screen
        headerComponent={<Header />}
        sectionComponent={
            <Section
                loading={ loadingInterpretationList }
                interpretations={ interpretationList }
                setInterpretationId={ setInterpretationId }
                setIsCreating={ setIsCreating }
            />
        }
    >
        {
            isCreating
                ? <CreatingInterpretation
                    setIsCreating={ setIsCreating }
                    setInterpretationId={ setInterpretationId }
                />
                : <SelectedInterpretation
                    interpretationId={ interpretationId! }
                    setIsCreating={ setIsCreating }
                />
        }
    </Screen>
}