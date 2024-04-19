import { useLandingContentStore } from '@/store'
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react'

export const EditHeroSection = () => {

    const landing = useLandingContentStore(state => state.landing);
    const changeHeroContent = useLandingContentStore(state => state.changeHeroContent);
    const { title, description, img, button } = landing.hero;

    const [formState, setFormState] = useState({
        title,
        description,
        imgSrc: img.src,
        imgAlt: img.alt,
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
    const [image, setImage] = useState('')

    const handleChageInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files
        if (files) {
            setImage(URL.createObjectURL(files[0]))
        }
    }

    useEffect(() => {
        changeHeroContent({
            title: formState.title,
            description: formState.description,
            button: {
                text: formState.buttonText,
                link: formState.buttonLink
            },
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
                placeholder="Hero title"
                value={formState.title}
                name="title"
                onChange={onInputChange} />
            <textarea
                className="input resize-none"
                cols={30}
                rows={4}
                spellCheck={false}
                placeholder="Hero title"
                value={formState.description}
                name="description"
                onChange={onTextareChange} />
            <input
                className="input"
                type="text"
                placeholder="Hero title"
                value={formState.buttonText}
                name="buttonText"
                onChange={onInputChange} />
            <input
                className="input"
                type="text"
                placeholder="Hero title"
                value={formState.buttonLink}
                name="buttonLink"
                onChange={onInputChange} />
            {/* <input
                className="input"
                type="text"
                placeholder="Hero title"
                value={formState.imgSrc}
                name="imgSrc"
                onChange={onInputChange} /> */}
            <input
                className="input"
                type="text"
                placeholder="Hero title"
                value={formState.imgAlt}
                name="imgAlt"
                onChange={onInputChange} />
            <input
                className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none rounded-s"
                id="file_input"
                type="file"
                onChange={handleChageInputFile}
            />
            {image && <Image src={image} width={100} height={100} alt='image hero' />}
        </section>
    )
}
