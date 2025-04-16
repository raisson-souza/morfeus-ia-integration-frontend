"use client"

import { AuthContextProvider } from "@/contexts/AuthContext"
import { theme } from "@/theme"
import Box from "../base/Box"
import CustomButton from "../customs/CustomButton"

export default function Header() {
    const { logoff } = AuthContextProvider()

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
        <Box.Row
            style={{
                height: "50%",
                alignContent: "space-between",
                width: "20%",
                gap: 10,
            }}
        >
            <h3
                onClick={() => window.open("https://expo.dev/accounts/raissonrai/projects/morfeus/builds/2c727b59-71f6-49ae-8341-e4924cb16236", "_blank")}
                style={{
                    color: theme.textColor,
                    cursor: "pointer",
                    boxShadow: "0 0px 10px rgba(255, 255, 255, 0.5)",
                    backgroundColor: "darkgreen",
                    borderRadius: 5,
                    padding: 8,
                    textAlign: "center",
                }}
            >
                Baixar Morfeus no Android
            </h3>
            <CustomButton
                msg="Sair"
                onClick={() => logoff()}
                width={"30%"}
                color="red"
                textColor={ theme.textColor }
            />
        </Box.Row>
    </Box.Row>
}