"use client"

import { Dispatch, SetStateAction, useState } from "react"
import Box from "../base/Box"
import CustomButton from "../customs/CustomButton"
import InterpretationService from "@/services/api/InterpretationService"

type CreatingInterpretationProps = {
    setInterpretationId: Dispatch<SetStateAction<number | null>>
    setIsCreating: Dispatch<SetStateAction<boolean>>
}

export default function CreatingInterpretation({
    setInterpretationId,
    setIsCreating,
}: CreatingInterpretationProps) {
    const [ dreamTitle, setDreamTitle ] = useState<string>("")
    const [ dreamDescription, setDreamDescription ] = useState<string>("")

    const createDreamDescription = async () => {
        await InterpretationService.CreateInterpretation(dreamTitle, dreamDescription)
            .then(response => {
                console.log("response", response)
                if (response.Success) {
                    setInterpretationId(response.Data.id)
                    setIsCreating(false)
                    return
                }
                alert(response.ErrorMessage)
            })
    }

    return <Box.Column>
        <Box.Column>
            <h1>Descreva seu sonho.</h1>
            <h3>Receba duas interpretações e uma imagem descritiva de uma IA!</h3>
            <input
                type="text"
                autoFocus
                value={dreamTitle}
                onChange={(e) => setDreamTitle(e.target.value)}
            />
            <input
                type="text"
                autoFocus
                placeholder="Sonhei que estava..."
                value={dreamDescription}
                onChange={(e) => setDreamDescription(e.target.value)}
            />
            <CustomButton
                msg="Enviar"
                onClick={async () => await createDreamDescription()}
            />
            <CustomButton
                msg="Enviar Áudio"
            />
        </Box.Column>
    </Box.Column>
}