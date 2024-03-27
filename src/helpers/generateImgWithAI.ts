import { ElementToEdit } from "@/interfaces/api-response"

interface Args {
    prompt: string,
    sectionId: string,
    oldSrc: string
}

export const gemerateImgWithAi = async ({ prompt, sectionId, oldSrc }: Args) => {

    const body = {
        prompt,
        sectionId,
        oldSrc
    }

    const resp = await fetch('http://localhost:3001/api/landing/img-create', {
        method: 'POST',
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
        url: json.url,
        template: json.data,
        sections: json.sections as { [id: string]: ElementToEdit[] }
    }
}