import { useLandingStore } from "@/store";
import { ChangeEvent, useEffect, useState } from "react";
import { EditFaqItem } from "./EditFaqItem";
import { FaqItem } from "@/landing/interfaces";

export const EditFaqSection = () => {
    const landing = useLandingStore(state => state.landing);
    const addNewFaqItem = useLandingStore(state => state.addNewFaqItem);
    const { title, faqData } = landing.faq;

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

    const handleAddNewFaqItem = () => {
        const newFaqItem: FaqItem = {
            question: '',
            answer: ''
        }

        addNewFaqItem(newFaqItem);
    }

    useEffect(() => {


    }, [formState])

    return (
        <section className="flex flex-col p-2 gap4">
            {/* <input
                className="input"
                type="text"
                placeholder="Hero title"
                value={formState.title}
                name="title"
                onChange={onInputChange} /> */}
            <div className="flex flex-col items-start gap-2">
                {
                    faqData.map((item, index) => (
                        <EditFaqItem key={index} title={`Question ${index + 1}`} faqItem={item} />
                    ))
                }
                <button
                    className="p-2 bg-blue-500 rounded-md text-white"
                    onClick={handleAddNewFaqItem}
                >
                    Agregar
                </button>

            </div>

        </section>
    )
}
