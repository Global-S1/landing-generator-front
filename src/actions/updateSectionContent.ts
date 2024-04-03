'use server'
import { LandingGeneratorApi } from "@/api";
import { ApiEditElementResponse } from "@/interfaces";
import { ElementToEdit, SectionType } from "@/interfaces/api-response";

interface Args {
    sectionId: SectionType;
    tagName: string;
    oldText?: string;
    currentText?: string;
    img?: {
        oldValues: OldImgValues;
        newValues: NewImgValues;
    },
    link?: {
        oldValues: OldLinkValues;
        newValues: NewLinkValues;
    }
}

interface OldImgValues {
    src: string;
    alt: string;
}

interface NewImgValues {
    src: string;
    alt: string;
}
interface OldLinkValues {
    text: string;
    href: string;
}

interface NewLinkValues {
    text: string;
    href: string;
}

export const updateSectionContent = async (landingId: string,{
    sectionId,
    tagName,
    oldText,
    currentText,
    img,
    link
}: Args): Promise<{ template: string, sections: { [id: string]: ElementToEdit[] } } | null> => {

    try {

        let body = {}

        if (img) {
            body = {
                sectionId,
                tagName,
                img
            }
        } else if (link) {
            body = {
                sectionId,
                tagName,
                link
            }
        }
        else {
            body = {
                sectionId,
                tagName,
                oldText,
                newText: currentText
            }
        }

        const resp = await LandingGeneratorApi.put<ApiEditElementResponse>(`/edit-element/${landingId}`, body)
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
