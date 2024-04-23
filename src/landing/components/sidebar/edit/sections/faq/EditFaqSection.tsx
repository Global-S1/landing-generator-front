import { useLandingStore } from "@/store";
import { EditFaqItem } from "./EditFaqItem";
import { FaqItem } from "@/landing/interfaces";
import { DisplaySection } from "../../DisplaySection";
import { useForm } from "@/hooks";

export const EditFaqSection = () => {
    const { landing, addNewFaqItem } = useLandingStore(state => state);
    const { faqData } = landing.faq;

    const handleAddNewFaqItem = () => {
        const newFaqItem: FaqItem = {
            question: '',
            answer: ''
        }

        addNewFaqItem(newFaqItem);
    }

    return (
        <section className="flex flex-col p-2 gap4">
            <DisplaySection sectionId="faq" />

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
