import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image';
import { useLandingStore } from '@/store'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { upadateSectionImg } from '@/landing/actions';
import { LandingContent } from '@/landing/interfaces';
import { useForm } from '@/hooks';

export const EditHeroSection = () => {

    const landingId = useLandingStore(state => state.id);
    const landing = useLandingStore(state => state.landing);
    const setLandingContent = useLandingStore(state => state.setLandingContent);
    const changeHeroContent = useLandingStore(state => state.changeHeroContent);
    const { title, description, img, button } = landing.hero;

    const { formState, onInputChange, onTextAreaChange } = useForm({
        title,
        description,
        imgAlt: img.alt,
        buttonText: button.text,
        buttonLink: button.link,
    })

    const [fileImg, setFileImg] = useState<File | null>(null)
    const [imgErrMsg, setImgErrMsg] = useState('')

    const handleChageInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            const file = files[0];
            if (!file.type.includes('image')) {
                setImgErrMsg('Ingresa una imagen')

                setTimeout(() => {
                    setImgErrMsg('')
                }, 3000);
                return;
            }
            if (file instanceof Blob) {

                setFileImg(file)
            } else {
                // Manejar caso donde `files[0]` no es un objeto Blob
                console.error('El archivo seleccionado no es válido.');
            }
        } else {
            // Manejar caso donde no se selecciona ningún archivo
            console.warn('Ningún archivo seleccionado.');
        }
    }

    async function uploadImage() {
        if (!fileImg || !fileImg.type.includes('image')) {
            setImgErrMsg('Selecciona una imagen')

            setTimeout(() => {
                setImgErrMsg('')
            }, 3000);
            return;
        };

        console.log('send image to cloud')
        const formData = new FormData()
        formData.append('file', fileImg)
        await upadateSectionImg(landingId, 'hero', landing, formData)
            .then(updatedLanding => {

                setLandingContent(landingId, updatedLanding.content as unknown as LandingContent);
            })
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
                src: img.src,
                alt: formState.imgAlt
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                onChange={onTextAreaChange} />
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
            <input
                className="input"
                type="text"
                placeholder="Hero title"
                value={formState.imgAlt}
                name="imgAlt"
                onChange={onInputChange} />
            <div className="flex flex-row items-center gap-2 mb-2">
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none rounded-s"
                    id="file_input"
                    type="file"
                    onChange={handleChageInputFile}
                />
                <button
                    className="editElement__button"
                    onClick={uploadImage}
                    aria-label="Upload image"
                >
                    <FaCloudUploadAlt />
                </button>
            </div>
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
