import { useLandingContentStore } from "@/store";
import { ChangeEvent, useEffect, useState } from "react";

export const EditCtaSection = () => {
    const landing = useLandingContentStore(state => state.landing);
    const changeCtaContent = useLandingContentStore(state => state.changeCtaContent);
    const { title, description, button } = landing.cta;

    const [formState, setFormState] = useState({
        title,
        description,
        buttonText: button.text,
        buttonLink: button.link,
    })

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    }
    const onTextareChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    useEffect(() => {

        changeCtaContent({
            title: formState.title,
            description: formState.description,
            button: {
                text: formState.buttonText,
                link: formState.buttonLink
            }
        })

    }, [formState])

    return (
        <section className="flex flex-col p-2 gap-2">
            <input
                className="w-full p-[4px]"
                type="text"
                placeholder="Hero title"
                value={formState.title}
                name="title"
                onChange={onInputChange} />
            <textarea
                className="w-full p-[4px] resize-none"
                cols={30}
                rows={4}
                spellCheck={false}
                placeholder="Hero title"
                value={formState.description}
                name="description"
                onChange={onTextareChange} />
            <input
                className="w-full p-[4px]"
                type="text"
                placeholder="Hero title"
                value={formState.buttonText}
                name="buttonText"
                onChange={onInputChange} />
            <input
                className="w-full p-[4px]"
                type="text"
                placeholder="Hero title"
                value={formState.buttonLink}
                name="buttonLink"
                onChange={onInputChange} />
        </section>
    )
}
