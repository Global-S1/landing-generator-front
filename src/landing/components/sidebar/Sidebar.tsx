'use client';
import { useLandingContentStore } from "@/store";
import { SectionItem } from "./SectionItem";
import { SectionType } from "@/interfaces";

export const Sidebar = () => {
    const landing = useLandingContentStore(state => state.landing)
    const sections = Object.keys(landing) as SectionType[]

    return (
        <aside className={`w-[400px] h-screen border-e-[1px] border-gray-600  p-2 overflow-y-scroll fixed`}>
            <section className="flex flex-col gap-2">
                {
                    sections.map(item => (
                        <SectionItem key={item} sectionId={item} />
                    ))
                }
            </section>
        </aside>
    )
}
