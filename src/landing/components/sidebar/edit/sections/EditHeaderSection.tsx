import { useForm } from "@/hooks"
import { useLandingStore } from "@/store"
import { ChangeEvent, useEffect } from "react"

export const EditHeaderSection = () => {

    const {
        setColor,
        sections: { header },
        changeHeaderContent
    } = useLandingStore(state => state)

    const { formState, onInputChange } = useForm({
        title: header.title
    })

    useEffect(() => {

        changeHeaderContent({
            title: formState.title
        })

    }, [formState])


    const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {

        const newColor = event.target.value; 
        setColor(newColor);
    }

    return (
        <section className="flex flex-col p-2 gap-4">
            <input
                className="input"
                type="text"
                placeholder="Header title"
                value={formState.title}
                name="title"
                onChange={onInputChange} />

            <div className="p-4">
                <input 
                type="color" 
                onChange={onColorChange}
                className="p-[1px] border-2 w-20 h-10"
                />
            </div>
        </section>
    )
}
