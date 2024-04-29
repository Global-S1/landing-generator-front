import { useLandingStore } from "@/store";
import { EditFeatureItem } from "./EditFeatureItem";
import { DisplaySection } from "../../DisplaySection";
import { InputChangeLayout } from "../../InputChangeLayout";
import { useForm } from "@/hooks";
import { useEffect } from "react";

export const EditFeaturesSection = () => {

    const {
        sections: { features: featuresInfo },

        addNewFeature,
        changeFeaturesContent
    } = useLandingStore(state => state);
    const { features, layout } = featuresInfo;

    const { formState, onInputChange } = useForm({
        title: featuresInfo.title
    })

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

    const options = [
        { name: 'Simple', option: '1' },
        { name: 'Cards', option: '2' },
        { name: 'ai', option: '3' },
    ];

    useEffect(() => {
        changeFeaturesContent({
            title: formState.title
        })
    }, [formState])

    return (
        <section className="flex flex-col p-2 gap-4">
            <DisplaySection
                status={layout.status}
                onChangeContent={value => {
                    changeFeaturesContent({
                        layout: {
                            id: featuresInfo.layout.id,
                            status: value
                        }
                    })
                }}
            />

            <InputChangeLayout
                defaultValue={featuresInfo.layout.id}
                options={options}
                onchangeOption={(option) => {
                    changeFeaturesContent({
                        layout: {
                            id: option,
                            status: featuresInfo.layout.status
                        }
                    })
                }}
            />

            <input
                className="input"
                type="text"
                placeholder="Title"
                value={formState.title}
                name="title"
                onChange={onInputChange} />

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
