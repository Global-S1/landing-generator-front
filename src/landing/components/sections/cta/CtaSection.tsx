import { CtaSectionProps } from "../../../interfaces"

export const CtaSection = ({ title, description, button }: CtaSectionProps) => {
    return (
        <section id="cta" className="relative py-[200px] bg-black">
            {/* <div className="absolute inset-0 bg-black z-10 opacity-40"></div> */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-xl md:text-4xl font-bold text-white mb-4">{title}</h1>
                <p className="text-lg md:text-xl text-white mb-6">{description}</p>
                <a href={button.link} className="bg-pink-500 hover:bg-pink-600 transition-all text-white font-bold py-3 px-6 rounded-full shadow-lg uppercase">{button.text}</a>
            </div>
            {/* <div className="absolute inset-0" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div> */}
        </section>
    )
}
