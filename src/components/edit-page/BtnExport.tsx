'use client';

import { SectionType } from "@/interfaces";
import { createTemplateToExport } from "@/landing/actions/createTemplateToExport";
import { useLandingStore } from "@/store";

export const BtnExport = () => {
    const landing = useLandingStore(state => state.landing);
    const sections = Object.keys(landing) as SectionType[];

    const exportLanding = async () => {

        let landingBody = ''

        sections.unshift('header')
        sections.forEach(section => {
            const $section = document.getElementById(section)
            if ($section) {
                landingBody += $section.outerHTML
            }
        })

        const template = await createTemplateToExport(landingBody)
        const blob = new Blob([template], { type: 'text/html' });

        const urlFile = window.URL.createObjectURL(blob);

        const linkDownload = document.createElement("a");
        linkDownload.href = urlFile;
        linkDownload.setAttribute("download", "landing.html");
        document.body.appendChild(linkDownload);

        linkDownload.click();
        linkDownload.remove();
    }

    return (
        <section
            onClick={exportLanding}
        >
            <button className="btn">export</button>
        </section>
    )
}
