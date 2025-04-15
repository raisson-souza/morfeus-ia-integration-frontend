import Box from "@/components/base/Box"
import LoadingGif from "../assets/loading.gif"

type LoadingProps = {
    text?: string
    size?: number
}

export default function Loading({
    text,
    size = 100,
}: LoadingProps) {
    return <Box.Column>
        {
            text
                ? <p>
                    { text }
                </p>
                : <></>
        }
        <img
            src={ LoadingGif.src }
            width={ size }
        />
    </Box.Column>
}