/** Posições dos filhos de Screen */
type childrenPositionType = "left" | "right" | "center" | "top" | "bottom"

/** Posições dos filhos do Section */
type sectionPositionType = "center" | "top"

/** Propriedades do componente Screen */
type ScreenProps = {
    /** Componentes filhos. */
    children: JSX.Element | JSX.Element[]
    /** Posição dos componentes filhos. */
    childrenPosition?: childrenPositionType
    /** Componente personalizado para header. */
    headerComponent?: JSX.Element
    /** Aparição do header. */
    showHeader?: boolean
    /** Componente personalizado para footer. */
    footerComponent?: JSX.Element
    /** Aparição do footer. */
    showFooter?: boolean
    /** Componente personalizado para section. */
    sectionComponent?: JSX.Element
    /** Posição dos filhos do componente section. */
    sectionPosition?: sectionPositionType
    /** Aparição do section. */
    showSection?: boolean
}

type defineChildrenPositionReturn = {
    childrenPositionJustifiedContent: string
    childrenPositionAlignedSelf: string
}

/**
 * Componente base para telas.
 * */
export default function Screen({
    children,
    childrenPosition = "center",
    headerComponent,
    showHeader = true,
    footerComponent,
    showFooter = true,
    sectionComponent,
    sectionPosition = "top",
    showSection = true,
}: ScreenProps) {
    // Se o header existe e deve aparecer, é montado
    const header = headerComponent && showHeader
        ? (
            <header style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                { headerComponent }
            </header>
        )
        : <></>

    // Se o footer existe e deve aparecer, é montado
    const footer = footerComponent && showFooter
        ? (
            <footer style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                { footerComponent }
            </footer>
        )
        : <></>

    // Se o section existe e deve aparecer, é montado
    const _section = sectionComponent && showSection
        ? (
            <section style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: sectionPosition === "top" ? "flex-start" : "unset",
                width: "25%",
            }}>
                { sectionComponent }
            </section>
        )
        : <></>
    const hasSection =  sectionComponent && showSection

    /**
     * Define as propriedades CSS de posição dos filhos de Screen
     * @returns {defineChildrenPositionReturn} JustifyContent e AlignSelf
    */
    const defineChildrenPosition = (): defineChildrenPositionReturn => {
        let definedChildrenPosition: string = ""
        switch (childrenPosition) {
            case "left": definedChildrenPosition = "flex-start"; break;
            case "right": definedChildrenPosition = "flex-end"; break;
            case "center": definedChildrenPosition = "center"; break;
            case "top": definedChildrenPosition = "top"; break;
            case "bottom": definedChildrenPosition = "bottom"; break;
            default: definedChildrenPosition = "flex-start"
        }
        return {
            childrenPositionJustifiedContent: definedChildrenPosition === "top" || definedChildrenPosition === "bottom"
                ? "center"
                : definedChildrenPosition,
            childrenPositionAlignedSelf: definedChildrenPosition === "top"
                ? "flex-start"
                : definedChildrenPosition === "bottom"
                    ? "flex-end"
                    : "auto"
        }
    }
    const {
        childrenPositionJustifiedContent,
        childrenPositionAlignedSelf
    } = defineChildrenPosition()

    return (
        <div
            className="screen"
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            { header }
            <main style={{
                flex: 1,
                display: "flex",
                justifyContent: hasSection
                    ? childrenPositionJustifiedContent
                    : "center",
                alignItems: "center",
                width: "100%",
            }}>
                { _section }
                <div style={{
                    flex: 1,
                    flexGrow: 1,
                    flexShrink: 1,
                    display: "flex",
                    justifyContent: childrenPositionJustifiedContent,
                    alignSelf: childrenPositionAlignedSelf,
                }}>
                    { children }
                </div>
            </main>
            { footer }
        </div>
    )
}