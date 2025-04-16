import { Dispatch, SetStateAction, useRef, useState } from "react"
import { theme } from "@/theme"
import Box from "./base/Box"
import CustomButton from "./customs/CustomButton"

export type MicrofoneProps = {
    setAudioBlob: Dispatch<SetStateAction<Blob | null>>
}

export default function Microfone({
    setAudioBlob,
}: MicrofoneProps) {
    const [ permission, setPermission ] = useState<boolean>(false)
    const [ stream, setStream ] = useState<MediaStream | null>(null)
    const [ isRecording, setIsRecording ] = useState<boolean>(false)
    const [ audioChunks, setAudioChunks ] = useState<any[]>([]) // Não foi possível identificar a tipagems
    const [ audio, setAudio ] = useState<string | null>(null)
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const mimeType = "audio/webm"

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                })
                setPermission(true)
                setStream(streamData)
            } catch (ex) {
                alert((ex as Error).message)
            }
        } else {
            alert("Funcionalidade de gravação de áudio não suportada por este navegador.");
        }
    };

    const startRecording = async () => {
        try {
            setIsRecording(true)

            //create new Media recorder instance using the stream
            const media = new MediaRecorder(stream!, { type: mimeType } as any)

            //set the MediaRecorder instance to the mediaRecorder ref
            mediaRecorder.current = media

            //invokes the start method to start the recording process
            mediaRecorder.current.start()

            let localAudioChunks: any[] = []

            mediaRecorder.current.ondataavailable = (event: any) => {
                if (typeof event.data === "undefined") return
                if (event.data.size === 0) return
                localAudioChunks.push(event.data)
            }

            setAudioChunks(localAudioChunks)
        }
        catch {
            setIsRecording(false)
        }
    }

    const stopRecording = () => {
        try {
            setIsRecording(false)

            //stops the recording instance
            mediaRecorder.current!.stop()

            mediaRecorder.current!.onstop = () => {
                //creates a blob file from the audiochunks data
                const audioBlob = new Blob(audioChunks, { type: mimeType })
                setAudioBlob(audioBlob)

                //creates a playable URL from the blob file.
                const audioUrl = URL.createObjectURL(audioBlob)

                setAudio(audioUrl)
                setAudioChunks([])
            }
        }
        catch {
            setIsRecording(false)
        }
    }

    return <Box.Center
        style={{
            width: "100%",
        }}
    >
        {
            permission
                ? <Box.Column
                    style={{
                        gap: 10,
                    }}
                >
                    {
                        isRecording
                            ? <CustomButton
                                msg="Parar Gravação"
                                onClick={() => stopRecording()}
                                color={ theme.quaternary }
                                textColor={ theme.textColor }
                            />
                            : <CustomButton
                                msg="Iniciar Gravação"
                                onClick={() => startRecording()}
                                color={ theme.quaternary }
                                textColor={ theme.textColor }
                            />
                    }
                    {
                        audio
                            ? isRecording
                                ? <></>
                                : <Box.Column
                                    style={{
                                        justifyContent: "space-evenly",
                                        gap: 3,
                                        alignContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <audio src={audio} controls></audio>
                                    <a
                                        download
                                        href={audio}
                                        style={{
                                            fontSize: 13,
                                            fontWeight: "bold",
                                            color: theme.textColor,
                                            cursor: "pointer",
                                        }}
                                    >
                                        BAIXAR
                                    </a>
                                </Box.Column>
                            : <></>
                    }
                </Box.Column>
                : <CustomButton
                    msg="Permitir Microfone"
                    onClick={() => getMicrophonePermission()}
                    color={ theme.quaternary }
                    textColor={ theme.textColor }
                />
        }
    </Box.Center>
}