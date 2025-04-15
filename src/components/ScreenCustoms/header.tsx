"use client"

import { theme } from "@/theme"
import Box from "../base/Box"

export default function Header() {
    return <Box.Row
        style={{
            backgroundColor: theme.primary,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 15,
        }}
    >
        <h1 style={{
            color: theme.textColor,
        }}>MORFEUS IA</h1>
        <h3 style={{
            color: theme.textColor,
        }}>Acessar App</h3>
    </Box.Row>
}