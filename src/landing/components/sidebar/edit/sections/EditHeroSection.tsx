import { ChangeEvent, useEffect, useState } from 'react'
import { useDesignStore, useLandingStore } from '@/store'
import { useForm } from '@/hooks';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { CreateImageWithAi } from '../CreateImageWithAi';
import { updateHeroImg, updateSectionLayout } from '@/landing/actions';
import { Button, Img, Layout } from '@/landing/interfaces';
import Image from 'next/image';

export const EditHeroSection = () => {

    const {
        sections: { hero },

        changeHeroContent
    } = useLandingStore(state => state);
    const { title, description, img, button } = hero;

    const heroOption = useDesignStore(state => state.heroOption);

    const {
        formState,
        fileImg,
        imgErrMsg,
        setImgErrMsg,
        onInputChange,
        onTextAreaChange,
        onInputFileChange
    } = useForm({
        title,
        description,
        imgAlt: img.alt,
        buttonText: button.text,
        buttonLink: button.link,
    })

    const options = [
        { name: 'Hero Clasico', option: '1' },
        { name: 'Imagen de fondo', option: '2' },
        { name: 'Full screen', option: '3' },
    ];
    const [sendDB, setSendDB] = useState(false)
    const [option, setOption] = useState(hero.layout.id)
    const onOptionChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {

        const option = event.target.value;

        setOption(option)
        setSendDB(true);
    };

    useEffect(() => {
        changeHeroContent({
            title: formState.title,
            description: formState.description,
            button: {
                text: formState.buttonText,
                link: formState.buttonLink
            },
            img: {
                src: img.src,
                alt: formState.imgAlt
            },
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState])

    async function uploadImage() {
        if (!fileImg || !fileImg.type.includes('image')) {
            setImgErrMsg('Selecciona una imagen')

            setTimeout(() => {
                setImgErrMsg('')
            }, 3000);
            return;
        };

        const formData = new FormData()
        formData.append('file', fileImg)
        await updateHeroImg({
            sectionId: hero.id,
            content: hero,
            formData
        })
            .then(updatedLanding => {

                if (!updatedLanding) return;

                changeHeroContent({
                    img: updatedLanding.img as unknown as Img,
                    title: updatedLanding.title,
                    description: updatedLanding.description,
                    button: updatedLanding.button as unknown as Button
                })

            })
    }

    useEffect(() => {
        if (sendDB) {
            updateSectionLayout(hero.id, option)
                .then(updatedSection => {
                    if (updatedSection) {

                        const layout = updatedSection.layout as unknown as Layout

                        changeHeroContent({
                            layout: { id: layout.id, status: true }
                        })
                        setSendDB(false);
                    }
                })
        }
    }, [sendDB])

    return (
        <section className="flex flex-col p-2 gap-4">

            <div className="flex flex-col gap-2">
                <span className="font-bold">Elije un diseño</span>
                <select className='input' onChange={onOptionChangeHandler} defaultValue={heroOption} >
                    {options.map(option => (
                        <option key={option.option} value={option.option}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
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
            <input
                className="input"
                type="text"
                placeholder="Image alt"
                value={formState.imgAlt}
                name="imgAlt"
                onChange={onInputChange} />

            <div className="flex flex-row items-center gap-2 mb-2">
                <input
                    className="input"
                    id="file_input"
                    type="file"
                    onChange={onInputFileChange}
                />
                <button
                    className="editElement__button"
                    onClick={uploadImage}
                    aria-label="Upload image"
                >
                    <FaCloudUploadAlt />
                </button>
            </div>

            <CreateImageWithAi defaultPrompt={img.alt} />

            {
                imgErrMsg
                &&
                <div className="p-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                    <span className="font-medium">{imgErrMsg}</span>
                </div>
            }
            <div className="mt-4">
                <Image src={img.src} width={100} height={100} alt='image hero' />
            </div>

        </section>
    )
}