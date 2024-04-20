"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export const DescriptionLandingForm = () => {

  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const desc = formData.get("description");

    const prompt = `Mi pagina se llama ${title}, ${desc}`;

    console.log({
      title, prompt
    })
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
