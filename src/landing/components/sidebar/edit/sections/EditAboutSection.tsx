import { useForm } from "@/hooks";
import { useLandingStore } from "@/store";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { DisplaySection } from "../DisplaySection";
import { EditImage } from "../EditImage";

export const EditAboutSection = () => {

    const {
        about,
       
        changeAboutContent
    } = useLandingStore(state => state);
    const { title, description, img } = about;

    const { formState, onInputChange, onTextAreaChange } = useForm({
        title,
        description,
        imgSrc: img.src,
        imgAlt: img.alt,
    })

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
        <section className="flex flex-col p-2 gap-4">

            <DisplaySection sectionId="about" status={about.layout.status}/>

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
            <EditImage idSection={about.id} imgSrc={img.src} imgAlt={img.alt}/> 
        </section>
    )
}
