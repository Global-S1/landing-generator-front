import { useLandingStore } from "@/store";
import { useEffect } from "react";
import { DisplaySection } from "../DisplaySection";
import { useForm } from "@/hooks";

export const EditCtaSection = () => {
    const {
        sections:{cta},
        changeCtaContent
    } = useLandingStore(state => state);
    const { title, description, button, layout } = cta;

    const { formState, onInputChange, onTextAreaChange } = useForm({
        title,
        description,
        buttonText: button.text,
        buttonLink: button.link,
    })

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
        <section className="flex flex-col p-2 gap-4">
            <DisplaySection sectionId="cta" status={layout.status}/>

            <input
                className="input"
                type="text"
                placeholder="Title"
                value={formState.title}
                name="title"
                onChange={onInputChange} />
            <textarea
                className="input resize-none"
                cols={30}
                rows={4}
                spellCheck={false}
                placeholder="Description"
                value={formState.description}
                name="description"
                onChange={onTextAreaChange} />
            <input
                className="input"
                type="text"
                placeholder="Button text"
                value={formState.buttonText}
                name="buttonText"
                onChange={onInputChange} />
            <input
                className="input"
                type="text"
                placeholder="Button link"
                value={formState.buttonLink}
                name="buttonLink"
                onChange={onInputChange} />
        </section>
    )
}
