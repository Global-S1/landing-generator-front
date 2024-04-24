export interface LandingResponse {
    id:         string;
    headerId:   string;
    heroId:     string;
    aboutId:    string;
    featuresId: string;
    faqId:      string;
    ctaId:      string;
    footerId:   string;
    landingId:  string;
    header:     Header;
    hero:       Hero;
    about:      About;
    features:   Features;
    faq:        Faq;
    cta:        Cta;
    footer:     Footer;
    landing:    Landing;
}


interface Section{
    id: string;
    layout: Layout
    landingId: string
}

export interface Hero extends Section{
    title:       string;
    description: string;
    button:     Button;
    img:        Img;
}
export interface About extends Section{
    title:       string;
    description: string;
    img:        Img;
}

export interface Button {
    text: string;
    link: string;
}

export interface Img {
    src: string;
    alt: string;
}

export interface Layout {
    id:     string;
    status: boolean;
}

export interface Header {
    id:        string;
    title:     string;
    landingId: string;
}
export interface Footer {
    id:        string;
    title:     string;
    landingId: string;
}

export interface Faq extends Section {
    title:     string;
    faqData:      FAQ[];
}

export interface FAQ {
    question: string;
    answer:   string;
}
export interface Features extends Section{
    title: string;
    features: Feature[];
}

export interface Feature {
    title:       string;
    description: string;
    img:         Img;
}
export interface Cta extends Section{
    title:       string;
    description: string;
    button:     Button;
}
export interface Landing {
    id:              string;
    title:           string;
    initialp_prompt: string;
    userId:          string;
}
