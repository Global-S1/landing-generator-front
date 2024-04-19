import { useEffect, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { SectionContent } from "./SectionContent"
import { SectionType } from "@/interfaces"
import { BoxEditLayout } from "./edit/BoxEditLayout"

import './edit/css/edit-content.css';
import { useUiStore } from "@/store"

export const SectionItem = ({ sectionId }: { sectionId: SectionType }) => {

    const [show, setShow] = useState(false);
    const setSectionSelected = useUiStore(state => state.setSectionSelected);

    const displayContent = () => {  
        setShow(!show)
    }
    
    useEffect(() => {
        if(show){
            setSectionSelected(sectionId)
      }
    }, [show])
    

    return (
        <>
            <div
                className="flex justify-between items-center border-[1px] border-gray-400 bg-white rounded-md p-3.5"
                onClick={displayContent}
            >
                <span className="tex-3xl capitalize">{sectionId}</span>
                {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {
                show && (<BoxEditLayout>
                    <SectionContent sectionId={sectionId} />
                </BoxEditLayout>)
            }
        </>

    )
}
