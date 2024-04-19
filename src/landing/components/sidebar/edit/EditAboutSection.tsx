import { useLandingContentStore } from "@/store";
import { ChangeEvent, useEffect, useState } from "react";

export const EditAboutSection = () => {

    const landing = useLandingContentStore(state => state.landing);
    const changeAboutContent = useLandingContentStore(state => state.changeAboutContent);
    const { title, description, img } = landing.about;

    const [formState, setFormState] = useState({
        title,
        description,
        imgSrc: img.src,
        imgAlt: img.alt,
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
        changeAboutContent({
            title: formState.title,
            description: formState.description,
            img: {
                src: formState.imgSrc,
                alt: formState.imgAlt
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
                value={formState.imgSrc}
                name="imgSrc"
                onChange={onInputChange} />
            <input
                className="w-full p-[4px]"
                type="text"
                placeholder="Hero title"
                value={formState.imgAlt}
                name="imgAlt"
                onChange={onInputChange} />
        </section>
    )
}
