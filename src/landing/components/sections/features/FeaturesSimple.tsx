import { Feature, Features } from '@/landing/interfaces'
import React from 'react'

export const FeaturesSimple = ({ title, features }: Features) => {
    return (
        <section id="features" className="text-center px-8 py-[100px]">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {title}
            </h2>
            {
                features.map((feature, idx) => (
                    <FeatureItem feature={feature} index={idx} />
                ))
            }
        </section>
    )
}

const FeatureItem = ({ feature, index }: { feature: Feature, index: number }) => {
    const { title, description, img } = feature;
    const numberItem = (index + 1);

    const classItemOrder = (numberItem % 2 == 0) ? 'md:order-first' : '';

    return (
        <div className="flex flex-wrap items-center mt-20 text-center">
            <div className="w-full md:w-3/5 lg:w-1/2 px-4">
                <img src={img.src} alt={img.alt} className="inline-block rounded shadow-lg border border-merino-400" />
            </div>
            <div className={`w-full md:w-2/5 lg:w-1/2 px-4 ${classItemOrder} text-center md:text-left lg:pl-12`}>
                <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                    {title}
                </h3>
                <p className="sm:text-lg mt-6">
                    {description}
                </p>
            </div>
        </div>
    )
}