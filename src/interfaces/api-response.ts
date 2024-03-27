export interface APIResponse {
    usage: Usage;
    sections: Sections;
    data: string;
}

export type SectionType = 'header' | 'hero' | 'faq' | 'features' | 'pricing' | 'testimonials' | 'about' | 'contact' | 'cta' | 'footer'
export type ElementType = 'title' | 'subtitle' | 'description' | 'img' | 'link'

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface ElementToEdit {
    tagName: string;
    type: ElementType;
    text: string;
    attributes: Attributes;
}

export interface Sections {
    [id: string]: ElementToEdit[]
}

export interface Attributes {
    alt?: string;
    class?: string;
    src?: string;
    href?: string;
    for?: string;
    type?: string;
    id?: string;
    name?: string;
    required?: string;
    rows?: string;
}



export interface Usage {
    tokens_section: number[];
    total_tokens: number;
}

