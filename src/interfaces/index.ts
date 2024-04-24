export type SectionType = 'header' | 'hero' | 'faq' | 'features' | 'about' | 'cta' | 'footer';

export type SectionsLayout = {
    [id in SectionType]: SectionConfig;
};

export interface SectionConfig{
    id: string;
    status: boolean;
}