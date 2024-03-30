'use client'

import { useState } from "react";
import { FaCode, FaDownload } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { PiKeyReturnBold } from "react-icons/pi";

import { LandingGeneratorApi } from "@/api";
import { useUiStore, useGeneratePageStore } from "@/store";
import { updateTemplateCode } from "@/helpers/updateTemplateCode";
import { ApiTemplateHistoryResponse } from "@/interfaces";

export const TopMenu = () => {

  const [isLoading, setIsLoading] = useState(false)

  const html = useGeneratePageStore((state) => state.html);
  const setPageHtml = useGeneratePageStore((state) => state.setPageHtml);
  const setSections = useGeneratePageStore((state) => state.setSections);
  const editedTemplate = useGeneratePageStore((state) => state.editedTemplate);

  const showCode = useUiStore((state) => state.showCode);
  const toggleShowCode = useUiStore((state) => state.toggleShowCode);

  async function exportLandingPage() {
    try {
      const body = {
        template: html
      };

      const resp = await LandingGeneratorApi.post('/export', body, {
        responseType: 'blob'
      })

      const fileBlob = resp.data;
      const urlFile = window.URL.createObjectURL(fileBlob); // enlace temporal para descargar el archivo

      const linkDownload = document.createElement("a");
      linkDownload.href = urlFile;
      linkDownload.setAttribute("download", "landing.html");
      document.body.appendChild(linkDownload);

      linkDownload.click(); // iniciar la descarga
      linkDownload.remove(); // Eliminar el enlace después de la descarga
    } catch (error) {
      console.log(error);
    }
  };

  async function setPreview() {
    if (editedTemplate === html) {
      toggleShowCode();
      return;
    }

    updateTemplateCode({ editedTemplate })
      .then(data => {
        if (!data) return

        setPageHtml(editedTemplate)
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
      const resp = await LandingGeneratorApi.get<ApiTemplateHistoryResponse>('/earlier-version');
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
