import { useLandingStore } from "@/store";
import { ChangeEvent, useEffect, useState } from "react";
import { EditFeatureItem } from "./EditFeatureItem";


export const EditFeaturesSection = () => {

    const landing = useLandingStore(state => state.landing);
    const addNewFeature = useLandingStore(state => state.addNewFeature);
    const { title, features } = landing.features;

    const [formState, setFormState] = useState({
        title,
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

    const handleAddNewFeature = () => {
        const newFeature = {
            title: 'New feature',
            description: 'New description',
            img: {
                src: 'https://placehold.co/600x400',
                alt: 'alt image'
            }
        }
        addNewFeature(newFeature)
    }

    useEffect(() => {

        //todo: Actualizar contenido

    }, [formState])

    return (
        <section className="flex flex-col p-2 gap-4">
            {/* <input
                className="input"
                type="text"
                placeholder="Hero title"
                value={formState.title}
                name="title"
                onChange={onInputChange} /> */}
            <div className="flex flex-col items-start gap-2">
                {
                    features.map((feature, index) => (
                        <EditFeatureItem key={index} title={`Feature ${index + 1}`} feature={feature} />
                    ))
                }
                <button
                    className="p-2 bg-blue-500 rounded-md text-white"
                    onClick={handleAddNewFeature}
                >
                    Agregar
                </button>
            </div>
        </section>
    )
}
