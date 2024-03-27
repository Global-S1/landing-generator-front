'use server'
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

interface OldImgValues{
    src: string;
    alt: string;
}

interface NewImgValues{
    src: string;
    alt: string;
}
interface OldLinkValues{
    text: string;
    href: string;
}

interface NewLinkValues{
    text: string;
    href: string;
}

export const updateSectionContent = async ({
    sectionId,
    tagName,
    oldText,
    currentText,
    img,
    link
}: Args): Promise<{ template: string, sections: { [id: string]: ElementToEdit[] } }> => {

    let body = {}

    if(img){
        body = {
            sectionId,
            tagName,
            img
        }
    }else if(link){
        body = {
            sectionId,
            tagName,
            link
        }
    }
    else{
        body = {
            sectionId,
            tagName,
            oldText,
            newText: currentText
        }

    }
    

    const resp = await fetch('http://localhost:3001/api/landing/edit-element', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!resp.ok) {
        console.log('Error')
    }
    const json = await resp.json()


    return {
        template: json.data,
        sections: json.sections as { [id: string]: ElementToEdit[] }
    }
}
