'use client';

import { createTemplateToExport } from "@/landing/actions/createTemplateToExport";
import { useLandingStore } from "@/store/landingStore";

export const BtnExport = () => {
    const {sectionsId: sections} = useLandingStore(state => state);

    const exportLanding = async () => {

        let landingBody = ''

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
