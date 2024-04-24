import Image from "next/image";
import { useLandingStore } from "@/store";
import { ChangeEvent, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CreateImageWithAi } from "./CreateImageWithAi";
import { updateSectionImg } from "@/landing/actions";
import { Button, Img } from "@/landing/interfaces";

interface Props {
  idSection: string;
  imgSrc: string;
  imgAlt: string;
}

export const EditImage = ({idSection, imgSrc, imgAlt }: Props) => {

  const {landing, changeHeroContent} = useLandingStore();

  const state = useLandingStore();
  
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
    await updateSectionImg(landing.id,idSection ,'hero', formData)
      .then(updatedLanding => {

        if(!updatedLanding) return;
        changeHeroContent({
          img: updatedLanding.img as unknown as Img,
          title:updatedLanding.title,
          description: updatedLanding.description,
          button: updatedLanding.button as unknown as Button
        })
      })
  }

  return (
    <>
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

      <CreateImageWithAi defaultPrompt={imgAlt} />

      {
        imgErrMsg
        &&
        <div className="p-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
          <span className="font-medium">{imgErrMsg}</span>
        </div>
      }
      <div className="mt-4">
        <Image src={imgSrc} width={100} height={100} alt='image hero' />
      </div>

    </>
  )
}
