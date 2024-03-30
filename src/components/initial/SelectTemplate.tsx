"use client";

import { useDataToStore } from "@/store";
import Image from "next/image";

export const SelectTemplate = () => {
  const setTemplateOption = useDataToStore(
    (state) => state.setTemplateOption
  );

  const onSetTemplate = async (option: number) => {
    console.log(option)
    setTemplateOption(option);
  };

  return (
    <div className="flex gap-2">
      <div className="cardTemplate" onClick={() => onSetTemplate(1)}>
        <Image
          src="/templates/template-1.png"
          width={300}
          height={200}
          alt="template 1"
          className="cardTemplate__img"
        />
      </div>
      <div className="cardTemplate" onClick={() => onSetTemplate(2)}>
        <Image
          src="/templates/template-2.png"
          width={300}
          height={200}
          alt="template 2"
          className="cardTemplate__img"
        />
      </div>
      <div className="cardTemplate" onClick={() => onSetTemplate(3)}>
        <Image
          src="/templates/template-3.png"
          width={300}
          height={200}
          alt="template 3"
          className="cardTemplate__img"
        />
      </div>
    </div>
  );
};
