import { useEffect } from "react"
import { useForm } from "@/hooks"
import { useLandingStore } from "@/store"

export const EditHeaderSection = () => {

    const {
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

    return (
        <section className="flex flex-col p-2 gap-4">
            <input
                className="input"
                type="text"
                placeholder="Header title"
                value={formState.title}
                name="title"
                onChange={onInputChange} />
        </section>
    )
}
