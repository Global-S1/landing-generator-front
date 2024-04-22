import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react'
import { useDesignStore, useLandingStore } from '@/store'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { upadateSectionImg, updateSectionsLayout } from '@/landing/actions';
import { LandingContent } from '@/landing/interfaces';
import { useForm } from '@/hooks';
import { SectionsLayout } from '@/interfaces';
import { EditImage } from './EditImage';

export const EditHeroSection = () => {

    const {
        id: landingId,
        landing,
        sectionsLayout,

        setSectionsLayout,
        changeSectionLayout,
        setLandingContent,
        changeHeroContent
    } = useLandingStore(state => state);
    const { title, description, img, button } = landing.hero;

    const heroOption = useDesignStore(state => state.heroOption);

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

    const options = [
        { name: 'Hero Clasico', option: '1' },
        { name: 'Imagen de fondo', option: '2' },
        { name: 'Full screen', option: '3' },
    ];
    const [sendDB, setSendDB] = useState(false)
    const onOptionChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {

        const option = event.target.value;
        changeSectionLayout('hero', option);

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
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState])


    useEffect(() => {
        if (sendDB) {
            updateSectionsLayout(landingId, sectionsLayout)
                .then(updatedLanding => {
                    setSectionsLayout(updatedLanding.sectionsLayout as unknown as SectionsLayout);

                    setSendDB(false);
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
                    className="block w-full h-10 place-content-center text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none rounded-s"
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
            <EditImage/>
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
