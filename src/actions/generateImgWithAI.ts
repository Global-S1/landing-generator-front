import { LandingGeneratorApi } from "@/api"
import { ApiImgResponse, ElementToEdit } from "@/interfaces"

interface Args {
    prompt: string,
    sectionId: string,
    oldSrc: string
}

export const gemerateImgWithAi = async ({ prompt, sectionId, oldSrc }: Args) => {
    try {
        const body = {
            prompt,
            sectionId,
            oldSrc
        }

        const resp = await LandingGeneratorApi.post<ApiImgResponse>('/images/create', body)

        const json = resp.data

        return {
            template: json.template,
            sections: json.sections as { [id: string]: ElementToEdit[] }
        }
    } catch (error) {
        console.log(error)
        return null
    }
}