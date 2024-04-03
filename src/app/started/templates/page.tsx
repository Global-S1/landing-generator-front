"use client";

import { LandingGeneratorApi } from "@/api";
import { SelectTemplate } from "@/components/initial";
import { LoaderEditSecion } from "@/components/main-content";
import { APIResponse } from "@/interfaces";
import { useDataToStore, useGeneratePageStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TemplatePage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)


  const prompt = useDataToStore((state) => state.prompt);
  const templateOption = useDataToStore((state) => state.template_option);
  const setPageHtml = useGeneratePageStore((state) => state.setPageHtml);
  const setSections = useGeneratePageStore((state) => state.setSections);
  const setLandingId = useGeneratePageStore((state) => state.setLandingId);

  async function onSubmit() {
    setIsLoading(true)
    try {
      const body = {
        user_id: 'ee0e2eb8-f318-4942-b3f8-acc1300695a4',
        template_id: templateOption,
        prompt
      };

      const resp = await LandingGeneratorApi.post<APIResponse>('/create', body)
      const json = resp.data;
      setLandingId(json.id)
      setPageHtml(json.template);
      setSections(json.sections)
      setIsLoading(false)
      router.push(`/create/${json.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="p-4 flex flex-col w-full items-center relative">
      <h1 className="text-4xl text-center font-bold font-sans">Plantillas</h1>
      <br />
      <p className="text-center text-md">
        Elige una plantilla para tu landing page y genera el contenido con IA.
      </p>
      <br />
      <br />
      <SelectTemplate />
      <br />
      <br />
      <button className="btn" onClick={onSubmit}>
        Enviar
      </button>
      {isLoading && <LoaderEditSecion />}
    </main>
  );
}


export const Loader = () => {
  return (
    <div className="bg-gray-200 opacity-50 w-full h-full absolute flex justify-center items-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    </div>
  )
}
