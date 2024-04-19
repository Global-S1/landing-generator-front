import { ChangeEvent, useEffect, useState } from "react"
import { FaqItem } from "@/landing/interfaces"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md";
import { useLandingContentStore } from "@/store";

interface Props {
    title: string;
    faqItem: FaqItem;
}

export const EditFaqItem = ({ title, faqItem }: Props) => {

    const deleteFaqItem = useLandingContentStore(state => state.deleteFaqItem)
    const [show, setShow] = useState(false);

    const background = 'bg-gray-300'
    const hover = 'hover:bg-gray-300'
    const bgSelected = (show) ? background : '';

    const handleDeleteFaqItem = () => deleteFaqItem(faqItem.question)

    return (
        <>
            <div className="flex flex-row w-full gap-4">
                <div
                    className={`editItem ${bgSelected} ${hover}`}
                    onClick={() => setShow(!show)}
                >
                    <span>
                        {title}
                    </span>

                    {show ? <IoIosArrowUp /> : <IoIosArrowDown />}

                </div>
                <button
                    className="editItem__btnDelete"
                    aria-label="Delete feature"
                    onClick={handleDeleteFaqItem}>
                    <MdDeleteOutline />
                </button>
            </div>
            {show && (<FaqContent {...faqItem} />)}
        </>
    )
}

export const FaqContent = (faqItem: FaqItem) => {

    const changeFaqItemContent = useLandingContentStore(state => state.changeFaqItemContent);

    const [formState, setFormState] = useState({
        question: faqItem.question,
        answer: faqItem.answer
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
        changeFaqItemContent(
            faqItem.question,
            {
                question: formState.question,
                answer: formState.answer
        })
    }, [formState])

    return (
        <div className="flex flex-col gap-4 p-2 overflow-hidden">
            <div>
                <span className="font-bold">Question</span>
                <input
                    className="input"
                    type="text"
                    placeholder="Question"
                    value={formState.question}
                    name="question"
                    onChange={onInputChange} />

            </div>
            <div>
                <span className="font-bold" >Answer</span>
                <textarea
                    className="input resize-none"
                    cols={30}
                    rows={4}
                    spellCheck={false}
                    placeholder="answer"
                    value={formState.answer}
                    name="answer"
                    onChange={onTextareChange} />
            </div>
        </div>
    )
}
