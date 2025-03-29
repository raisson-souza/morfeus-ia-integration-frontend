"use client"

import Box from "@/components/base/Box"
import Link from "next/link"
import Screen from "@/components/base/Screen"

export default function HomeScreen() {
  return (
    <Screen>
      <Box.Column>
        <h1>Project Template Web</h1>
        <Box.Column>
          <Link href="/admin">ADMIN</Link>
          <Link href="/board">BOARD</Link>
        </Box.Column>
      </Box.Column>
    </Screen>
  )
}