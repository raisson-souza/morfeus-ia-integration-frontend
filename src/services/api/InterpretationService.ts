import { Interpretation, InterpretationListed } from "@/types/interpretation"
import Endpoints from "./base/Endpoints"

export default abstract class InterpretationService extends Endpoints {
    static async CreateInterpretation(title: string, dream: string) {
        return await this.Post<Interpretation>({
            url: "/interpretations/",
            authorization: this.GetAuthorization() ?? undefined,
        })
    }

    static async GetInterpretation(id: number) {
        return await this.Get<Interpretation>({
            url: `/interpretations/get/${ id }`,
            authorization: this.GetAuthorization() ?? undefined,
        })
    }

    static async ListInterpretations() {
        return await this.Get<InterpretationListed[]>({
            url: "/interpretations/list",
            authorization: this.GetAuthorization() ?? undefined,
        })
    }

    static async GetInterpretationImage(id: number) {
        return await this.Get<string>({
            url: `/interpretations/get_interpretation_image/${ id }`,
            authorization: this.GetAuthorization() ?? undefined,
        })
    }

    static async CreateInterpretationByAudio() {
        return await this.Post<Interpretation>({
            url: "/interpretations/interpretation_by_audio",
            authorization: this.GetAuthorization() ?? undefined,
        })
    }
}