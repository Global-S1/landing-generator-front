import { SectionType } from "@/interfaces";
import { create } from "zustand";

interface UiStore {

    sectionSelected: SectionType | null;
    setSectionSelected: (section: SectionType) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    sectionSelected: null,

    setSectionSelected: (value: SectionType) => set({
        sectionSelected: value
    })
}))