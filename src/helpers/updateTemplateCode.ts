import { LandingGeneratorApi } from "@/api";
import { ApiEditTemplateResponse } from "@/interfaces";

export const updateTemplateCode = async ({ editedTemplate }: { editedTemplate: string }) => {
    try {
        const body = {
            template: editedTemplate
        }

        const resp = await LandingGeneratorApi.put<ApiEditTemplateResponse>('/edit-template', body)
        const json = resp.data;

        return json
    } catch (error) {
        console.log(error)
        return null
    }
}
