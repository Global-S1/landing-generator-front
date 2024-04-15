'use client'

import { useState } from "react";
import { FaCode, FaDownload } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { PiKeyReturnBold } from "react-icons/pi";

import { LandingGeneratorApi } from "@/api";
import { useUiStore, useGeneratePageStore } from "@/store";
import { updateTemplateCode } from "@/actions";
import { ApiTemplateHistoryResponse } from "@/interfaces";

export const TopMenu = () => {

  const [isLoading, setIsLoading] = useState(false)

  const html = useGeneratePageStore((state) => state.html);
  const landingId = useGeneratePageStore(state => state.landingId)
  const setPageHtml = useGeneratePageStore((state) => state.setPageHtml);
  const setSections = useGeneratePageStore((state) => state.setSections);
  const editedTemplate = useGeneratePageStore((state) => state.editedTemplate);

  const showCode = useUiStore((state) => state.showCode);
  const toggleShowCode = useUiStore((state) => state.toggleShowCode);

  async function exportLandingPage() {
    try {
        const resp = await LandingGeneratorApi.post(`/export/${landingId}`, {
            responseType: 'text'  // Esperando respuesta como texto
        });

        const blob = new Blob([resp.data], { type: 'text/html' });

        const urlFile = window.URL.createObjectURL(blob);

        const linkDownload = document.createElement("a");
        linkDownload.href = urlFile;
        linkDownload.setAttribute("download", "landing.html");
        document.body.appendChild(linkDownload);

        linkDownload.click();
        linkDownload.remove();
    } catch (error) {
        console.log(error);
    }
}

  async function setPreview() {
    if (editedTemplate === html) {
      toggleShowCode();
      return;
    }

    updateTemplateCode({ landingId, editedTemplate })
      .then(data => {
        if (!data) return

        setPageHtml(data.template)
        setSections(data.sections)
        toggleShowCode()
      })
      .catch(error => {
        console.log(error)
        toggleShowCode()
      })
  }

  async function earlierVersion() {
    setIsLoading(true)
    try {
      const resp = await LandingGeneratorApi.get<ApiTemplateHistoryResponse>(`/earlier-version/${landingId}`);
      const json = resp.data;

      setSections(json.sections)
      setPageHtml(json.template)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <section className="flex gap-4">
      <button className="btn flex items-center gap-2" disabled={isLoading} onClick={earlierVersion}>
        <PiKeyReturnBold />
        Revertir cambios
      </button>

      {
        (!showCode)
          ? <button className="btn" onClick={setPreview}>
            <FiEye />
          </button>
          : <button className="btn" onClick={() => toggleShowCode()}>
            <FaCode />
          </button>
      }
      
      <button className="btn" disabled={!html} onClick={exportLandingPage}>
        <FaDownload />
      </button>
    </section>
  );
};
