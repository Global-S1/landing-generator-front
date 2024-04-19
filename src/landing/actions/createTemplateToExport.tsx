'use server'

import { JSDOM } from "jsdom";

const scriptFaq = `<script>
document.addEventListener("DOMContentLoaded", function () {
    const faqButtons = document.querySelectorAll("#faq button");

    faqButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "none" ? "block" : "none";
        });
    });
});
</script>`

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
</body>
</html>`

export const createTemplateToExport = async (body: string) => {

    const dom = new JSDOM(html);
    const document = dom.window.document;

    document.body.innerHTML = body;

    document.body.innerHTML += scriptFaq
    
    return dom.serialize();
}
