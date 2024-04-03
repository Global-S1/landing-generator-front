import { create } from "zustand";

interface UseDataToStore{
    prompt: string;
    template_option: string;
    setPrompt: (value: string) => void;
    setTemplateOption: (value: string) => void;
}

export const useDataToStore = create<UseDataToStore>((set) => ({
    prompt: '',
    template_option: '',
    setPrompt: (value: string) => set(state => ({
        prompt: value
    })),
    setTemplateOption: (value: string) => set(state => ({
        template_option: value
    })),
   
}))