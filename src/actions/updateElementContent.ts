'use server';
import { LandingGeneratorApi } from "@/api";
import { ApiEditElementResponse } from "@/interfaces";
import { ElementToEdit, SectionType } from "@/interfaces/api-response";

interface Args {
    data_id: string
    sectionId: SectionType;
    tagName: string;
    newText?: string;
    img?: {
        alt: string;
        src: string;
    },
    link?: {
        href: string;
        text: string;
    }
}

export const updateElementContent = async (landingId: string, {
    sectionId,
    data_id,
    tagName,
    newText,
    img,
    link
}: Args) => {

    try {
        let body = {};

        if (img) {
            body = {
                data_id,
                sectionId,
                tagName,
                img
            }
        } else if (link) {
            body = {
                data_id,
                sectionId,
                tagName,
                link
            }
        }
        else {
            body = {
                data_id,
                sectionId,
                tagName,
                newText,
            }
        }

        const resp = await LandingGeneratorApi.put<ApiEditElementResponse>(`/edit-element/${landingId}`, body);
        const json = resp.data;

        return {
            template: json.template,
            sections: json.sections as { [id: string]: ElementToEdit[] }
        }
    } catch (error) {
        console.log(error)
        return null
    }

}
