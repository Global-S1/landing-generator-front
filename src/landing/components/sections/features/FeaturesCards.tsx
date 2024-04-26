import { Features } from "@/landing/interfaces"

export const FeaturesCards = ({ title, features }: Features) => {
    return (
        <section id="features" className="py-[100px] bg-gray-900 text-gray-100 sm:py-12 lg:py-16">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
                    <h2 className="text-3xl font-bold leading-tight text-gray-50 sm:text-4xl xl:text-5xl mb-6">{title}</h2>
                    {/* <p className="mb-4">We are creating a tool that helps you be more productive and efficient when building
                websites and webapps</p> */}

                </div>
                <div
                    className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
                        {
                            features.map(feature => (
                                <div key={feature.title} className="relative overflow-hidden bg-white shadow-md rounded-xl h-full">
                                    <div className="p-9">
                                        <img className="w-12 h-12 sm:mx-0" src={feature.img.src} alt="" />
                                       
                                        <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">{feature.title}</h3>
                                        <p className="mt-6 text-base text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))
                        }


                </div>
            </div>
        </section>
    )
}
