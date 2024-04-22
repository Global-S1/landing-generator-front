import { Feature } from "@/landing/interfaces"
import { useLandingStore } from "@/store";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md";

interface Props {
    title: string;
    feature: Feature;
}

export const EditFeatureItem = ({ title, feature }: Props) => {
    const deleteFeature = useLandingStore(state => state.deleteFeature);
    const [show, setShow] = useState(false);

    const background = 'bg-gray-300';
    const hover = 'hover:bg-gray-300';
    const bgSelected = (show) ? background : '';

    const handleDeleteFeature = () => deleteFeature(feature.title);

    return (
        <>
            <div className="flex flex-row w-full gap-4">
                <div
                    className={`editItem ${bgSelected} ${hover}`}
                    onClick={() => setShow(!show)}
                >
                    <span>
                        {title}
                    </span>

                    {show ? <IoIosArrowUp /> : <IoIosArrowDown />}

                </div>
                <button
                    className="editItem__btnDelete"
                    aria-label="Delete feature"
                    onClick={handleDeleteFeature}>
                    <MdDeleteOutline />
                </button>
            </div>
            {show && (<EditFeatureContent {...feature} />)}
        </>
    )
}

export const EditFeatureContent = (feature: Feature) => {

    const changeFeatureContent = useLandingStore(state => state.changeFeatureItemContent);
    const [formState, setFormState] = useState({
        title: feature.title,
        description: feature.description
    })

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    }
    const onTextareChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const [image, setImage] = useState('')

    const handleChageInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files
        if (files) {
            const imgUrl = URL.createObjectURL(files[0])
            setImage(imgUrl)
            changeFeatureContent(feature.title, {
                img: {
                    alt: feature.img.alt,
                    src: imgUrl
                }
            })
        }
    }

    useEffect(() => {

        changeFeatureContent(
            feature.title,
            {
                title: formState.title,
                description: formState.description,
            })

    }, [formState])

    return (
        <div className="flex flex-col gap-4 p-2 overflow-hidden">
            <div>
                <span className="font-bold">Titulo</span>
                <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={formState.title}
                    name="title"
                    onChange={onInputChange} />

            </div>
            <div>
                <span className="font-bold" >Descripcion</span>
                <textarea
                    className="input resize-none"
                    cols={30}
                    rows={4}
                    spellCheck={false}
                    placeholder="Description"
                    value={formState.description}
                    name="description"
                    onChange={onTextareChange} />
            </div>
            <div>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none rounded-s"
                    id="file_input"
                    type="file"
                    onChange={handleChageInputFile}
                />
                <div className="mt-4">
                    <Image
                        src={feature.img.src}
                        width={100} height={100}
                        alt='image hero'
                    />
                </div>

            </div>
        </div>
    )
}
