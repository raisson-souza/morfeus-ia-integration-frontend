import { Tooltip } from "@mui/material"

type CustomButtonProps = {
    msg : string
    onClick? : () => any
    color? : string
    isBold? : boolean
    tooltipMsg? : string
    type? : "button" | "reset" | "submit"
    textColor?: string
    width?: `${ number }%` | number
}

export default function CustomButton({
    msg,
    onClick = () => {},
    color = "grey",
    isBold = true,
    tooltipMsg = "",
    type = "button",
    textColor = "black",
    width = "100%",
} : CustomButtonProps) {
    const button = (
        <button
            onClick={ onClick }
            style={{
                backgroundColor: color,
                padding: "4px",
                borderRadius: "10px",
                cursor: "pointer",
                width: width,
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