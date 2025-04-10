export type Interpretation = {
    dream: string
    title: string
    dreamOntopsychologyInterpretation: string | null
    dreamPsychoanalysisInterpretation: string | null
    imagePath: string | null
    directAccessId: number | null
    morfeusAccessId: number | null
    createdAt: string
    updatedAt: string | null
    id: number
}

export type InterpretationListed = {
    id: number
    title: string
    createdAt: string
}