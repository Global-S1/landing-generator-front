import { LandingContent } from "../interfaces";

export const landingContentExample: LandingContent = {
    hero: {
        title: 'text',
        description: 'text',
        button: { text: 'text', link: '#' },
        img: {
            src: 'text',
            alt: 'text'
        }
    },
    about: {
        title: 'text',
        description: 'text',
        img: {
            src: 'text',
            alt: 'text'
        }
    },
    features: {
        title: 'text',
        features: [
            {
                title: 'text',
                description: 'text',
                img: {
                    src: 'text',
                    alt: 'text'
                }
            },
            {
                title: 'text',
                description: 'text',
                img: {
                    src: 'text',
                    alt: 'text'
                }
            },
            {
                title: 'text',
                description: 'text',
                img: {
                    src: 'text',
                    alt: 'text'
                }
            }
        ]
    },
    faq: {
        title: 'text',
        faqData: [
            {
                question: 'text',
                answer: 'text'
            },
            {
                question: 'text',
                answer: 'text'
            },
            {
                question: 'text',
                answer: 'text'
            },
            {
                question: 'text',
                answer: 'text'
            },
            {
                question: 'text',
                answer: 'text'
            }
        ]
    },
    cta: {
        title: 'text',
        description: 'text',
        button: { text: 'text', link: '#' },
    },
    footer: {
        socials: [
            { name: 'text', link: 'text' }
        ]
    }
}