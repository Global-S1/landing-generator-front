'use client';
import { useLandingStore } from "@/store";
import { SectionItem } from "./SectionItem";
import { SectionType } from "@/interfaces";

export const Sidebar = () => {
    const landing = useLandingStore(state => state.landing)
    const sections = Object.keys(landing) as SectionType[]

    return (
        <aside className={`w-[400px] mt-[50px] h-screen border-e-[1px] border-gray-600 bg-gray-50 p-2 overflow-y-scroll fixed`}>
            <section className="flex flex-col gap-4">
                {
                    sections.map(item => (
                        <SectionItem key={item} sectionId={item} />
                    ))
                }
            </section>
        </aside>
    )
}
