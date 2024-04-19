import { SectionType } from "@/interfaces";
import { create } from "zustand";

interface UiStore {
    showCode: boolean;
    toggleShowCode: () => void;
    loadingEditSection: boolean;
    toggleLoadingEditSection: () => void;
    setToggleLoadingEditSection: (value: boolean) => void;

    sectionSelected: SectionType | null;
    setSectionSelected: (section: SectionType) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    showCode: true,
    sectionSelected: null,
    toggleShowCode: () => set(state => ({
        showCode: !state.showCode
    })),
    loadingEditSection: false,
    toggleLoadingEditSection: () => set(state => ({
        loadingEditSection: !state.loadingEditSection
    })),
    setToggleLoadingEditSection: (value) => set(state => ({
        loadingEditSection: value
    })),
    setSectionSelected: (value: SectionType) => set({
        sectionSelected: value
    })
}))