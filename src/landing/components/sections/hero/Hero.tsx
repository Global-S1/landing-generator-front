import { HeroSectionProps } from "../../../interfaces"

export const HeroSection = ({ title, description, img, button }: HeroSectionProps) => {
    return (
        <section id="hero" className="relative">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative h-[700px] flex items-center justify-center text-center">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>
                    <p className="text-lg md:text-xl text-white mb-6">{description}</p>
                    <a href={button.link} className="bg-pink-500 hover:bg-pink-600 transition-all text-white font-bold py-3 px-6 rounded-full shadow-lg uppercase">{button.text}</a>
                </div>
            </div>
            <div className="absolute inset-0" style={{ backgroundImage: `url(${img.src})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -10 }}></div>
        </section>
    )
}