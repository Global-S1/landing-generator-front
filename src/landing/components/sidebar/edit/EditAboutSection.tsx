import { useLandingContentStore } from "@/store";
import Image from "next/image";
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

    const [image, setImage] = useState('')

    const handleChageInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files
        if (files) {
            const imgUrl = URL.createObjectURL(files[0])

            setImage(imgUrl)
            changeAboutContent({
                img: {
                    src: imgUrl,
                    alt: formState.imgAlt
                }
            })
        }
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
        <section className="flex flex-col p-2 gap-4">
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
                onChange={onTextareChange} />
            <input
                className="input"
                type="text"
                placeholder="Img alt"
                value={formState.imgAlt}
                name="imgAlt"
                onChange={onInputChange} />
            <input
                className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none rounded-s"
                id="file_input"
                type="file"
                onChange={handleChageInputFile}
            />
            <div className="mt-4">
                <Image src={img.src} width={100} height={100} alt='image hero' />
            </div>
        </section>
    )
}
