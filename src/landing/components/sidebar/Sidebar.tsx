'use client';

import { SectionItem } from "./SectionItem";
import { useLandingStore } from "@/store/landingStore";

export const Sidebar = () => {
    const { sectionsId: sections } = useLandingStore(state => state);

    return (
        <aside className={`w-[400px] mt-[50px] h-[93vh] border-e-[1px] border-gray-600 bg-gray-50 p-2 overflow-y-scroll fixed`}>
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
