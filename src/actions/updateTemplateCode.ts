import { LandingGeneratorApi } from "@/api";
import { ApiEditTemplateResponse } from "@/interfaces";

export const updateTemplateCode = async ({landingId, editedTemplate }: { landingId: string, editedTemplate: string }) => {
    try {
        const body = {
            editedTemplate
        }

        const resp = await LandingGeneratorApi.put<ApiEditTemplateResponse>(`/edit-template/${landingId}`, body)
        const json = resp.data;

        return json
    } catch (error) {
        console.log(error)
        return null
    }
}
