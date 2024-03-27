import { create } from "zustand";

interface UseDataToStore{
    prompt: string;
    template_option: number;
    setPrompt: (value: string) => void;
    setTemplateOption: (value: number) => void;
}

export const useDataToStore = create<UseDataToStore>((set) => ({
    prompt: '',
    template_option: 0,
    setPrompt: (value: string) => set(state => ({
        prompt: value
    })),
    setTemplateOption: (value: number) => set(state => ({
        template_option: value
    })),
   
}))