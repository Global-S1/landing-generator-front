"use client";

import { Template, TemplateListResponse } from "@/interfaces";
import { useDataToStore } from "@/store";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export const SelectTemplate = () => {
  const setTemplateOption = useDataToStore(
    (state) => state.setTemplateOption
  );

  const onSetTemplate = async (templateid: string) => {
    setTemplateOption(templateid);
  };

  const [templates, setTemplates] = useState<Template[]>([])

  useEffect(() => {
    axios.get<TemplateListResponse>('http://localhost:3001/api/template')
      .then(resp => {
        const json = resp.data;

        setTemplates(json.data)

      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="flex gap-2">
      {
        templates.map((template, idx) => (
          <div key={template.id} className="cardTemplate" onClick={() => onSetTemplate(template.id)}>
            <Image
              src={`/templates/template-${idx+1}.png`}
              width={300}
              height={200}
              alt={`template ${idx+1}`}
              className="cardTemplate__img"
            />
          </div>
        ))
      }
    </div>
  );
};
