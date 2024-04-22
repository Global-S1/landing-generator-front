export type SectionType = 'header' | 'hero' | 'faq' | 'features' | 'pricing' | 'testimonials' | 'about' | 'contact' | 'cta' | 'footer';

export type SectionsLayout = {
    [id in SectionType]: SectionConfig;
};

export interface SectionConfig{
    id: string;
    status: boolean;
}