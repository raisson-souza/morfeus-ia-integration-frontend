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
            boxShadow: "0 0px 5px rgba(255, 255, 255, 0.5)",
            zIndex: 10,
        }}
    >
        <h1 style={{ color: theme.textColor }}>MORFEUS IA</h1>
        <h3
            onClick={() => window.open("https://expo.dev/accounts/raissonrai/projects/morfeus/builds/2c727b59-71f6-49ae-8341-e4924cb16236", "_blank")}
            style={{
                color: theme.textColor,
                cursor: "pointer",
                boxShadow: "0 0px 10px rgba(255, 255, 255, 0.5)",
                backgroundColor: "darkgreen",
                borderRadius: 5,
                padding: 8,
            }}
        >
            Baixar Morfeus no Android
        </h3>
    </Box.Row>
}