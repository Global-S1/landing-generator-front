import { useLandingStore } from "@/store";
import { EditFeatureItem } from "./EditFeatureItem";
import { DisplaySection } from "../../DisplaySection";

export const EditFeaturesSection = () => {

    const {
        sections:{features: featuresInfo},
        
        addNewFeature
    } = useLandingStore(state => state);
    const { features, layout } = featuresInfo;

    const handleAddNewFeature = () => {
        const newFeature = {
            title: 'New feature',
            description: 'New description',
            img: {
                src: 'https://placehold.co/600x400',
                alt: 'alt image'
            }
        }
        addNewFeature(newFeature)
    }

    return (
        <section className="flex flex-col p-2 gap-4">
            <DisplaySection sectionId="features" status={layout.status} />

            <div className="flex flex-col items-start gap-2">
                {
                    features.map((feature, index) => (
                        <EditFeatureItem key={index} title={`Feature ${index + 1}`} feature={feature} />
                    ))
                }
                <button
                    className="p-2 bg-blue-500 rounded-md text-white"
                    onClick={handleAddNewFeature}
                >
                    Agregar
                </button>
            </div>
        </section>
    )
}
