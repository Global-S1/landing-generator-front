import { ChangeEvent, useEffect, useState } from 'react'
import { useDesignStore, useLandingStore } from '@/store'
import { upadateSectionImg, updateSectionsLayout } from '@/landing/actions';
import { LandingContent } from '@/landing/interfaces';
import { useForm } from '@/hooks';
import { SectionsLayout } from '@/interfaces';
import { EditImage } from '../EditImage';

export const EditHeroSection = () => {

    const {
        id: landingId,
        landing,
        sectionsLayout,

        setSectionsLayout,
        changeSectionLayout,
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

            <EditImage imgSrc={img.src} imgAlt={img.alt} />

        </section>
    )
}
