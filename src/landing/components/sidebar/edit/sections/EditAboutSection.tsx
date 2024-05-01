import { useForm } from "@/hooks";
import { useLandingStore } from "@/store";
import { ChangeEvent, useEffect, useState } from "react";
import { DisplaySection } from "../DisplaySection";
import { updateAboutImg } from "@/landing/actions";
import { Img } from "@/landing/interfaces";
import Image from "next/image";
import { CreateImageWithAi } from "../CreateImageWithAi";
import { FaCloudUploadAlt } from "react-icons/fa";

export const EditAboutSection = () => {

  const {
    sections: { about },

    changeAboutContent
  } = useLandingStore(state => state);
  const { title, description, img } = about;

  const { formState, onInputChange, onTextAreaChange } = useForm({
    title,
    description,
    imgSrc: img.src,
    imgAlt: img.alt,
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
    await updateAboutImg({
      sectionId: about.id,
      content: about,
      formData
    })
      .then(updatedLanding => {

        if (!updatedLanding) return;

        changeAboutContent({
          img: updatedLanding.img as unknown as Img,
          title: updatedLanding.title,
          description: updatedLanding.description,
        })

      })
  }


  useEffect(() => {
    changeAboutContent({
      title: formState.title,
      description: formState.description,
      img: {
        src: formState.imgSrc,
        alt: formState.imgAlt
      }
    })
  }, [formState])

  return (
    <section className="flex flex-col p-2 gap-4">

      <DisplaySection
        status={about.layout.status}
        onChangeContent={value => {
          changeAboutContent({
            layout: {
              id: about.layout.id,
              status: value
            }
          })
        }} />

      <input
        className="input"
        type="text"
        placeholder="Title"
        value={formState.title}
        name="title"
        onChange={onInputChange} />
      <textarea
        className="input resize-none"
        cols={30}
        rows={4}
        spellCheck={false}
        placeholder="Description"
        value={formState.description}
        name="description"
        onChange={onTextAreaChange} />
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

      {
        imgErrMsg
        &&
        <div className="p-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
          <span className="font-medium">{imgErrMsg}</span>
        </div>
      }

      <CreateImageWithAi
        defaultPrompt={img.alt}
        onSaveData={async (imgUrl) => {
          await updateAboutImg({ sectionId: about.id, content: about, imgUrl })
            .then(updatedLanding => {

              if (!updatedLanding) return;

              changeAboutContent({
                img: updatedLanding.img as unknown as Img,
              })
            })
        }}
      />

      <div className="mt-4">
        <Image src={img.src} width={100} height={100} alt='image about' />
      </div>
    </section>
  )
}
