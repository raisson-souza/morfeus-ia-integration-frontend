import { Tooltip } from "@mui/material"

type CustomButtonProps = {
    msg : string
    onClick? : () => any
    color? : string
    isBold? : boolean
    tooltipMsg? : string
    type? : "button" | "reset" | "submit"
    textColor?: string
}

export default function CustomButton({
    msg,
    onClick = () => {},
    color = "grey",
    isBold = true,
    tooltipMsg = "",
    type = "button",
    textColor = "black",
} : CustomButtonProps) {
    const button = (
        <button
            onClick={ onClick }
            style={{
                backgroundColor: color,
                padding: "4px",
                borderRadius: "10px",
            }}
            type={ type }
            color={ textColor }
        >
            { isBold ? <b style={{ color: textColor }}>{ msg }</b> : <>{ msg }</> }
        </button>
    )

    return tooltipMsg === ""
        ? button
        : <Tooltip title={ tooltipMsg }>{ button }</Tooltip>
}