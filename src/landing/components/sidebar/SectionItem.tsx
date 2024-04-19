import { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { SectionContent } from "./SectionContent"
import { SectionType } from "@/interfaces"

export const SectionItem = ({ sectionId }: { sectionId: SectionType }) => {

    const [show, setShow] = useState(false)

    return (
        <>
            <div
                className="flex justify-between items-center border-[1px] border-gray-400 rounded-md p-2"
                onClick={() => setShow(!show)}
            >
                <span className="tex-3xl">{sectionId}</span>
                {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {show && <SectionContent sectionId={sectionId} />}
        </>

    )
}
