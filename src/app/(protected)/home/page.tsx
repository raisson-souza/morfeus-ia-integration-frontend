"use client"

import Header from "@/components/ScreenCustoms/header"
import Screen from "@/components/base/Screen"
import Section from "@/components/ScreenCustoms/section"

export default function InternalHome() {
    return <Screen
        headerComponent={<Header />}
        sectionComponent={<Section />}
    >
        <h1>Home</h1>
    </Screen>
}