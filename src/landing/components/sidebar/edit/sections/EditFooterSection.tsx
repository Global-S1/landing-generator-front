import { useForm } from "@/hooks"
import { useLandingStore } from "@/store"
import { useEffect } from "react"

export const EditFooterSection = () => {
    const {
        sections: { footer },
        changeFooterContent
    } = useLandingStore(state => state)

    const { formState, onInputChange } = useForm({
        title: footer.title
    })

    useEffect(() => {
        changeFooterContent({
            title: formState.title
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
        </section>
    )
}
