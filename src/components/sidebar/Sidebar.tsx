'use client'

import { useGeneratePageStore } from "@/store/generatePageStore"
import { SectionList } from "./"

export const Sidebar = () => {

    const html = useGeneratePageStore(state => state.html)
    return (
        <aside className="sidebar h-full">
            
            <hr />
            {html && <SectionList />}
        </aside>
    )
}
