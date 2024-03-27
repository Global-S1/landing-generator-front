'use client'

import { useUiStore, useGeneratePageStore } from "@/store";
import { useState } from "react";
import { FaCode, FaDownload } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { PiKeyReturnBold } from "react-icons/pi";

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
      const resp = await fetch("http://localhost:3001/api/landing/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const fileBlob = await resp.blob();
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
    try {
      if (editedTemplate === html) {
        toggleShowCode();
        return;
      }

      const resp = await fetch("http://localhost:3001/api/landing/edit-template", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          template: editedTemplate
        })
      })

      if (!resp.ok) {
        const error = await resp.json()
        console.log(error)
        return
      }

      const json = await resp.json();
      console.log(json)
      setSections(json.sections)
      setPageHtml(editedTemplate)
      toggleShowCode()

    } catch (error) {
      console.log(error)
      toggleShowCode()
    }
  }

  async function earlierVersion() {
    setIsLoading(true)
    try {
      const resp = await fetch('http://localhost:3001/api/landing/earlier-version')

      if (!resp.ok) {
        const error = await resp.json()
        console.log(error)
        return
      }

      const json = await resp.json();
      setIsLoading(false)
      setSections(json.sections)
      setPageHtml(json.data)
    } catch (error) {
      console.log(error)
      setIsLoading(false)

    }
  }

  return (
    <section className="flex gap-4">
      <button className="btn flex items-center gap-2" disabled={!html} onClick={earlierVersion}>
        <PiKeyReturnBold />
        Revertir cambios
      </button>

      <button className="btn" onClick={setPreview}>
        <FiEye />
      </button>
      <button className="btn" onClick={() => toggleShowCode()}>
        <FaCode />
      </button>

      <button className="btn" disabled={!html} onClick={exportLandingPage}>
        <FaDownload />
      </button>
    </section>
  );
};
