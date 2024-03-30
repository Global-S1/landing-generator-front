import { LandingGeneratorApi } from "@/api"
import { ApiImgAiResponse } from "@/interfaces"
import { ElementToEdit } from "@/interfaces/api-response"

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

        const resp = await LandingGeneratorApi.post<ApiImgAiResponse>('/img-create', body)

        const json = resp.data

        return {
            url: json.url,
            template: json.template,
            sections: json.sections as { [id: string]: ElementToEdit[] }
        }
    } catch (error) {
        console.log(error)
        return null
    }





}