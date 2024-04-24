import Image from "next/image";
import { useLandingStore } from "@/store";
import { ChangeEvent, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CreateImageWithAi } from "./CreateImageWithAi";
import { Button, Img } from "@/landing/interfaces";
import { SectionType } from "@/interfaces";

interface Props {
  idSection: string;
  section: SectionType
  imgSrc: string;
  imgAlt: string;
}

export const EditImage = ({ idSection, section, imgSrc, imgAlt }: Props) => {

  return (
    <>
      <div>editar imagen</div>
    </>
  )
}
