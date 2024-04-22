"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createLandingContent } from "@/landing/actions/createLandingContent";
import { useLandingStore } from "@/store";
import { LandingContent } from "@/landing/interfaces";

export const DescriptionLandingForm = () => {

  const router = useRouter();
  const setLandingContent = useLandingStore(state => state.setLandingContent);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const desc = formData.get("description") as string;

    if (title.trim().length > 2 && desc) {
      const prompt = `Mi pagina se llama ${title}, ${desc}`;
      const landing = await createLandingContent(title, prompt)

      if (landing) {
        setLandingContent(landing.id, landing.content as unknown as LandingContent);

        router.push('/edit-page');
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="descriptionForm">
      <input
        type="text"
        name="title"
        placeholder="Ingresa el nombre de la aplicación"
        required
        className="promptContainer__title"
      />
      <textarea
        name="description"
        required
        id=""
        cols={20}
        rows={5}
        spellCheck={false}
        className="promptContainer__desc"
      ></textarea>
      <button type="submit" className="btn">
        Siguiente
      </button>
    </form>
  );
};
