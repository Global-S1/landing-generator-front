import { ElementToEdit, Sections, Usage } from '@/interfaces/api-response';
import { create } from 'zustand'

interface GeneratePageState {
    html: string;
    loading: boolean;
    templateOption: number;
    editedTemplate: string;
    sections: { [d: string]: ElementToEdit[] };

    setIsLoading: (value: boolean) => void;
    setPageHtml: (value: string) => void;
    setEditedTemplate: (value: string) => void;
    setTemplateOption: (value: number) => void;
    setSections: (value: { [id: string]: ElementToEdit[] }) => void;
}

export const useGeneratePageStore = create<GeneratePageState>((set) => ({
    loading: false,
    html: '',
    templateOption: 0,
    editedTemplate: '',
    sections: {},

    setPageHtml: (value: string) => set(state => ({
        html: value
    })),
    setEditedTemplate: (value: string) => set(state => ({
        editedTemplate: value
    })),
    setIsLoading: (value: boolean) => set(state => ({
        loading: value,
    })),

    setTemplateOption: (value: number) => set(state => ({
        templateOption: value
    })),
    setSections: (value: { [d: string]: ElementToEdit[] }) => set(state => ({
        sections: value
    }))
}))