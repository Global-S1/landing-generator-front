'use client'

import { useForm } from "@/hooks";
import { useGeneratePageStore } from '@/store';
import { updateSectionContent } from '@/helpers/updateSectionContent';
import { IoSaveOutline } from 'react-icons/io5';
import { ElementProps } from "./Element";

export const TitleElementSection = ({ element, sectionId }: ElementProps) => {

    const { formState, onInputChange } = useForm({
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
            <span className='capitalize font-bold'>{element.type}</span>
            <div className='flex flex-row'>
                <input
                    className='p-2 border-[1px] w-full border-gray-500 rounded-s-md'
                    name="element_edit"
                    type="text"
                    value={formState.element_edit}
                    onChange={onInputChange}
                />
                <button
                    className='editElement__button rounded-e-md'
                    aria-label="uUdate"
                    onClick={updateLandingContent}>
                    <IoSaveOutline />
                </button>
            </div>
        </div>
    );
};
