import { create } from "zustand";

interface DesignStore{
    heroOption: string;

    setHeroOption: (option: string) =>  void;
}

export const useDesignStore = create<DesignStore>((set) => ({
    heroOption: '1',

    setHeroOption: (option: string) => set({
        heroOption: option
    })
}))