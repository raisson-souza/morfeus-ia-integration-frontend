import { Interpretation, InterpretationListed } from "@/types/interpretation"
import Endpoints from "./base/Endpoints"

export default abstract class InterpretationService extends Endpoints {
    static async CreateInterpretation(title: string, dream: string) {
        return await this.Post<Interpretation>({
            url: "/interpretation/",
            authorization: this.GetAuthorization() ?? undefined,
            body: {
                "dream": dream,
                "title": title,
            }
        })
    }

    static async GetInterpretation(id: number) {
        return await this.Get<Interpretation>({
            url: `/interpretation/get/${ id }`,
            authorization: this.GetAuthorization() ?? undefined,
        })
    }

    static async ListInterpretation() {
        return await this.Get<InterpretationListed[]>({
            url: "/interpretation/list",
            authorization: this.GetAuthorization() ?? undefined,
        })
    }

    static async GetInterpretationImage(id: number) {
        return await this.Get<string>({
            url: `/interpretation/get_interpretation_image/${ id }`,
            authorization: this.GetAuthorization() ?? undefined,
        })
    }

    static async CreateInterpretationByAudio(title: string, audioBlob: Blob) {
        const formData = new FormData()
        formData.append('upload', audioBlob, 'audio.webm')
        formData.append('title', title)

        return await this.Post<Interpretation>({
            url: "/interpretation/interpretation_by_audio",
            authorization: this.GetAuthorization() ?? undefined,
            body: formData,
            ommitDefaultHeader: true,
            jsonifyBody: false,
        })
    }

    static async RegenerateInterpretation(id: number) {
        return await this.Post<Interpretation>({
            url: `/interpretation/regenerate_interpretation/${ id }`,
            authorization: this.GetAuthorization() ?? undefined,
        })
    }

    static async RegenerateImage(id: number) {
        return await this.Post<string | null>({
            url: `/interpretation/regenerate_image/${ id }`,
            authorization: this.GetAuthorization() ?? undefined,
        })
    }
}