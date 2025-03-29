import { Modal } from "@mui/material"

type CustomModalProps = {
    children : JSX.Element
    open : boolean
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
    canBackdropExit? : boolean
}

export default function CustomModal({
    children,
    open,
    setOpen,
    canBackdropExit = true
} : CustomModalProps) {
    return (
        <Modal
            open={ open }
            aria-labelledby="modal-message-title"
            aria-describedby="modal-message-description"
            onClose={ (_, reason) => {
                if (reason === "backdropClick" && !canBackdropExit) return
                setOpen(false)
            }}
        >
            <main style={{
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: "grey",
                border: `2px solid grey`,
                padding: 10
            }}>
                { children }
            </main>
        </Modal>
    )
}