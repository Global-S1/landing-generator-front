import { useLandingContentStore } from "@/store";
import { ChangeEvent, useEffect, useState } from "react";


export const EditFeaturesSection = () => {

    const landing = useLandingContentStore(state => state.landing);
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

    useEffect(() => {

        //todo: Actualizar contenido

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
        </section>
    )
}
