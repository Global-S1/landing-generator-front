import { useForm } from "@/hooks";
import { updateAboutImg, updateFeatureItemImg } from "@/landing/actions";
import { Feature, Img } from "@/landing/interfaces"
import { useLandingStore } from "@/store";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md";
import { CreateImageWithAi } from "../../CreateImageWithAi";
import { FaCloudUploadAlt } from "react-icons/fa";

interface Props {
    title: string;
    feature: Feature;
}

export const EditFeatureItem = ({ title, feature }: Props) => {
    const {
        deleteFeature
    } = useLandingStore(state => state);
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

    const {
        sections:{features},
        changeFeaturesContent,
        changeFeatureItemContent
    } = useLandingStore(state => state);
    
    const {formState, onInputChange, onTextAreaChange} = useForm({
        title: feature.title,
        description: feature.description
    })

    const [fileImg, setFileImg] = useState<File | null>(null)
    const [imgErrMsg, setImgErrMsg] = useState('')


    const handleChageInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files
    
        if (files && files.length > 0) {
          const file = files[0];
          if (!file.type.includes('image')) {
            setImgErrMsg('Ingresa una imagen')
    
            setTimeout(() => {
              setImgErrMsg('')
            }, 3000);
            return;
          }
          if (file instanceof Blob) {
    
            setFileImg(file)
          } else {
            // Manejar caso donde `files[0]` no es un objeto Blob
            console.error('El archivo seleccionado no es válido.');
          }
        } else {
          // Manejar caso donde no se selecciona ningún archivo
          console.warn('Ningún archivo seleccionado.');
        }
      }

      async function uploadImage() {
        if (!fileImg || !fileImg.type.includes('image')) {
          setImgErrMsg('Selecciona una imagen')
    
          setTimeout(() => {
            setImgErrMsg('')
          }, 3000);
          return;
        };
    
        const formData = new FormData()
        formData.append('file', fileImg)

        await updateFeatureItemImg(feature.title,{
          sectionId: features.id,
          content: features,
          formData
        })
          .then(updatedLanding => {
    
            if(!updatedLanding) return;
            
            changeFeaturesContent({
                title: updatedLanding.title,
                features: updatedLanding.features as unknown as Feature[]
            })
               
          })
      }

    useEffect(() => {

        changeFeatureItemContent(
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
                    onChange={onTextAreaChange} />
            </div>
            <div>
            <div className="flex flex-row items-center gap-2 mb-2">
                <input
                    className="input"
                    id="file_input"
                    type="file"
                    onChange={handleChageInputFile}
                />
                <button
                    className="editElement__button"
                    onClick={uploadImage}
                    aria-label="Upload image"
                >
                    <FaCloudUploadAlt />
                </button>
            </div>

            <CreateImageWithAi defaultPrompt={feature.img.alt} />

            {
                imgErrMsg
                &&
                <div className="p-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                    <span className="font-medium">{imgErrMsg}</span>
                </div>
            }
            <div className="mt-4">
                <Image src={feature.img.src} width={100} height={100} alt='image hero' />
            </div>

            </div>
        </div>
    )
}
