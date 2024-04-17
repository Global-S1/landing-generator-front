
export const HeroSection = () => {
    return (
        <>
        <section id="hero" className="relative">
            <div className="absolute inset-0 bg-black z-10 opacity-30"></div>
            <div className="relative z-10 h-[700px] flex items-center justify-center text-center">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Título de la Sección Hero</h1>
                    <p className="text-lg md:text-xl text-white mb-6">Descripción de la sección hero que destaca los beneficios principales de tu producto o servicio.</p>
                    <a href="#" className="bg-pink-500 hover:bg-pink-600 transition-all text-white font-bold py-3 px-6 rounded-full shadow-lg uppercase">¡Acción!</a>
                </div>
            </div>
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://assets.unileversolutions.com/recipes-v2/235485.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </section>
        </>
    )
}
