import { landingContent } from "./landingContentExample";
import { FaqItem, Feature, LandingContent } from "../interfaces";

export const prepareData = () => {

    const landingContentCopy = { ...landingContent };

    // Agregar IDs únicos a las features
    landingContentCopy.features.features = agregarIDs<Feature>(landingContent.features.features);

    // Agregar IDs únicos a las faqData
    landingContentCopy.faq.faqData = agregarIDs<FaqItem>(landingContent.faq.faqData);

    console.log(landingContentCopy)

}

// Función para agregar IDs únicos a los elementos de un array de objetos
function agregarIDs<T>(array: T[]): (T & { id: string })[] {
    return array.map((objeto, indice) => {
        return { ...objeto, id: `ID_${indice + 1}` };
    });
}