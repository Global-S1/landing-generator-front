import { SectionType } from "@/interfaces";
import { About, Cta, Faq, FaqItem, Feature, Features, Footer, Hero, Landing, LandingResponse } from "../landing/interfaces";
import { Header } from "@/landing/interfaces";
import { create } from "zustand";


interface SetInitState {
    landing: Landing;
    sections: {
        header: Header;
        hero: Hero;
        about: About;
        features: Features;
        faq: Faq;
        cta: Cta;
        footer: Footer;
    }
}

interface LandingState {
    landing: Landing;
    sections: {
        header: Header;
        hero: Hero;
        about: About;
        features: Features;
        faq: Faq;
        cta: Cta;
        footer: Footer;
    }

    sectionsId: SectionType[];
    setState: (value: SetInitState) => void;
    setSections: (value: SectionType[]) => void;

    changeFeatureItemContent: (oldTitle: string, value: ChangeFeatureItemContent) => void;

    changeHeroContent: (value: ChangeHeroContent) => void;
    changeAboutContent: (value: ChangeAboutContent) => void;
    changeFeaturesContent: (value: ChangeFeaturesContent) => void;
    changeCtaContent: (value: ChangeCtaContent) => void;

    addNewFeature: (value: Feature) => void;
    deleteFeature: (title: string) => void;

    changeFaqItemContent: (oldQuestion: string, value: ChangeFaqItemContent) => void;
    addNewFaqItem: (value: FaqItem) => void;
    deleteFaqItem: (value: string) => void;

}

interface ChangeHeroContent extends Partial<Omit<Hero, "id" | "landingId">> { }
interface ChangeAboutContent extends Omit<About, "id" | "layout" | "landingId"> { }

interface ChangeFeatureItemContent extends Partial<Feature> { }
interface ChangeFeaturesContent extends Omit<Features, "id" | "layout" | "landingId"> { }
interface ChangeFaqItemContent {
    question?: string;
    answer?: string;
}
interface ChangeFaqContent extends Partial<Omit<Faq, "id" | "layout" | "landingId">> { }
interface ChangeCtaContent extends Omit<Cta, "id" | "layout" | "landingId"> { }

export const useLandingStore = create<LandingState>((set) => ({
    landing: {} as Landing,
    sections: {
        header: {} as Header,
        hero: {} as Hero,
        about: {} as About,
        features: {} as Features,
        faq: {} as Faq,
        cta: {} as Cta,
        footer: {} as Footer,
    },
    sectionsId: ['header', 'hero', 'about', 'features', 'faq', 'cta', 'footer'],

    setSections: (value: SectionType[]) => set({
        sectionsId: [...value]
    }),
    setState: (value: SetInitState) => set({
        ...value
    }),

    changeHeroContent: (value: ChangeHeroContent) => set(({ sections }) => ({
        sections: {
            ...sections,
            hero: {
                ...sections.hero,
                ...value
            },
        }
    })),
    changeAboutContent: (value: ChangeAboutContent) => set(({ sections }) => ({
        sections: {

            ...sections,
            about: {
                ...value,
                id: sections.about.id,
                layout: sections.about.layout,
                landingId: sections.about.landingId,
            },
        }
    })),
    changeFeaturesContent: (value: ChangeFeaturesContent) => set(({ sections }) => ({
        sections: {
            ...sections,
            features: {
                ...value,
                id: sections.about.id,
                layout: sections.about.layout,
                landingId: sections.about.landingId,
            },
        }
    })),
    changeCtaContent: (value: ChangeCtaContent) => set(({ sections }) => ({
        sections: {
            ...sections,
            cta: {
                ...value,
                id: sections.cta.id,
                layout: sections.cta.layout,
                landingId: sections.cta.landingId,
            }
        }
    })),


    // Features
    changeFeatureItemContent: (oldTitle: string, value: ChangeFeatureItemContent) => set(({ sections }) => ({
        sections: {
            ...sections,
            features: {
                ...sections.features,
                features: sections.features.features.map(f => {
                    if (f.title.trim() === oldTitle.trim()) {
                        const updatedFeature = {
                            ...f,
                            ...value
                        }
                        return updatedFeature
                    }
                    return f
                })
            }
        }
    })),

    addNewFeature: (value: Feature) => set(({ sections }) => ({
        sections: {
            ...sections,
            features: {
                ...sections.features,
                features: [...sections.features.features, value]
            }
        }
    })),
    deleteFeature: (value: string) => set(({ sections }) => ({
        sections: {
            ...sections,
            features: {
                ...sections.features,
                features: sections.features.features.filter(f => f.title.trim() !== value.trim())
            }
        }
    })),


    // Faq
    changeFaqItemContent: (oldQuestion: string, value: ChangeFaqItemContent) => set(({ sections }) => ({
        sections: {
            ...sections,
            faq: {
                ...sections.faq,
                faqData: sections.faq.faqData.map(f => {
                    if (f.question.trim() === oldQuestion.trim()) {
                        const updatedFaqItem = {
                            ...f,
                            ...value
                        }
                        return updatedFaqItem
                    }
                    return f
                })
            }
        }
    })),
    addNewFaqItem: (value: FaqItem) => set(({ sections }) => ({
        sections: {
            ...sections,
            faq: {
                ...sections.faq,
                faqData: [...sections.faq.faqData, value]
            }
        }
    })),
    deleteFaqItem: (value: string) => set(({ sections }) => ({
        sections: {
            ...sections,
            faq: {
                ...sections.faq,
                faqData: sections.faq.faqData.filter(f => f.question.trim() !== value.trim())
            }
        }
    }))

}))