import { useLandingStore } from "@/store";
import { EditFaqItem } from "./EditFaqItem";
import { FaqItem } from "@/landing/interfaces";
import { DisplaySection } from "../../DisplaySection";
import { InputChangeLayout } from "../../InputChangeLayout";

export const EditFaqSection = () => {
    const {
        sections: { faq },

        addNewFaqItem,
        changeFaqContent
    } = useLandingStore(state => state);
    const { faqData, layout } = faq;

    const handleAddNewFaqItem = () => {
        const newFaqItem: FaqItem = {
            question: '',
            answer: ''
        }

        addNewFaqItem(newFaqItem);
    }

    const options = [
        { name: 'Simple', option: '1' },
        { name: 'Dinamico', option: '2' },
    ];

    return (
        <section className="flex flex-col p-2 gap-4">
            <DisplaySection
                status={layout.status}
                onChangeContent={value => {
                    changeFaqContent({
                        layout: {
                            id: faq.layout.id,
                            status: value
                        },
                    })
                }}
            />

            <InputChangeLayout
                defaultValue={faq.layout.id}
                options={options}
                onchangeOption={(option) => {
                    changeFaqContent({
                        layout: {
                            id: option,
                            status: faq.layout.status
                        }
                    })
                }}
            />

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
