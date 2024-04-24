"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createLandingContent } from "@/landing/actions/createLandingContent";
import { About, Cta, Faq, Features, Footer, Header, Hero } from "@/landing/interfaces";
import { useLandingStore } from "@/store/landingStore";

export const DescriptionLandingForm = () => {

  const router = useRouter();
  const {setState} = useLandingStore(state => state);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const desc = formData.get("description") as string;

    if (title.trim().length > 2 && desc) {
      const prompt = `Mi pagina se llama ${title}, ${desc}`;
      const resp = await createLandingContent(title, prompt)

      if (resp) {
        const {header, hero, about, features, faq, cta, footer, landing} = resp;
        setState({
          landing,
          header: header as Header,
          hero: hero as unknown as Hero,
          about: about as unknown as About,
          features: features as unknown as Features,
          faq: faq as unknown as Faq,
          cta: cta as unknown as Cta,
          footer: footer as Footer,
        })

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
