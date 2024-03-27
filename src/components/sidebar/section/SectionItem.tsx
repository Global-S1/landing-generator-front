import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { SectionType } from '@/interfaces/api-response'
import { SectionItemEdit } from './SectionItemEdit'

interface Props {
    title: string;
    sectionId: SectionType;
}

export const SectionItem = ({ title, sectionId }: Props) => {

    const [show, setShow] = useState(false)

    const background = 'bg-gray-300'
    const hover = 'hover:bg-gray-300'
    const bgSelected = (show) ? background : ''

    return (
        <>
            <section
                className={`rounded-md border-2 ${bgSelected} ${hover} border-gray-400 p-2 flex justify-between items-center`}
                onClick={() => setShow(!show)}
            >
                <span className='capitalize'>
                    {title}
                </span>
                {
                    show ? <IoIosArrowUp /> : <IoIosArrowDown />

                }
            </section>
            {show && <SectionItemEdit sectionId={sectionId} />}
        </>
    )
}
