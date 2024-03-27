"use client";

import { useGeneratePageStore } from "@/store";
import { Editor } from "@monaco-editor/react";
import { useEffect } from "react";
export const EditorCodeView = () => {
  const html = useGeneratePageStore((state) => state.html);
  const setEditedTemplate = useGeneratePageStore((state) => state.setEditedTemplate);

  useEffect(() => {
    setEditedTemplate(html)
  }, [])

  return (

    <Editor
      className="w-full h-[88vh]"
      value={html}
      theme="vs-dark"
      defaultLanguage="html"
      options={{ minimap: { enabled: false }, padding: { top: 20 } }}
      onChange={(value) => setEditedTemplate(value!)}
    />
  );
};
