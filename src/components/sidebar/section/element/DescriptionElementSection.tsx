'use client'

import { useForm } from "@/hooks";
import { useGeneratePageStore } from '@/store';
import { updateSectionContent } from '@/helpers/updateSectionContent';
import { IoSaveOutline } from 'react-icons/io5';
import { ElementProps } from "./Element";

export const DescriptionElementSection = ({ element, sectionId }: ElementProps) => {

    const { formState, onTextAreaChange } = useForm({
        element_edit: element.text
    });

    const setPageHtml = useGeneratePageStore(state => state.setPageHtml)
    const setSections = useGeneratePageStore(state => state.setSections)

    async function updateLandingContent() {
        updateSectionContent({
            sectionId: sectionId,
            tagName: element.tagName,
            oldText: element.text,
            currentText: formState.element_edit
        }).then(data => {
            setPageHtml(data.template)
            setSections(data.sections)
        })
    }

    return (
        <div className='flex flex-col gap-2'>

            <div className='flex fle-row justify-between'>
                <span className='capitalize font-bold'>{element.type}</span>
                <button
                    className='editElement__button rounded-md'
                    aria-label="uUdate"
                    onClick={updateLandingContent}>
                    <IoSaveOutline />
                </button>
            </div>
            <textarea
                name="element_edit"
                value={formState.element_edit}
                onChange={onTextAreaChange}
                id=""
                cols={30}
                rows={5}
                spellCheck={false}
                className="p-2 border-[1px] w-full border-gray-500 rounded-md resize-none"
            ></textarea>
        </div>
    );
};
