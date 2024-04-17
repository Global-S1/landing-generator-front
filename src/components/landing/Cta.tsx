
export const CtaSection = () => {
    return (
        <section id="cta" className="relative py-[200px]">
            <div className="absolute inset-0 bg-black z-10 opacity-40"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-xl md:text-4xl font-bold text-white mb-4">Saborea los Sabores de Nuestras Irresistibles Hamburguesas</h1>
                {/* <p className="text-lg md:text-xl text-white mb-6">Descripción de la sección hero que destaca los beneficios principales de tu producto o servicio.</p> */}
                <a href="#" className="bg-pink-500 hover:bg-pink-600 transition-all text-white font-bold py-3 px-6 rounded-full shadow-lg uppercase">Odnea ahora</a>
            </div>
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://s1.eestatic.com/2019/11/15/cocinillas/actualidad-gastronomica/hamburguesas-actualidad_gastronomica_444717658_138049840_1706x960.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </section>
    )
}
