async function executeScript(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const scripts = Array.from(tempDiv.querySelectorAll("script"));
    scripts.forEach(s => s.remove());

    const contentWithoutScripts = tempDiv.innerHTML;

    await Promise.resolve(contentWithoutScripts);

    for (let script of scripts) {
        if (script.src) {
            await new Promise((resolve, reject) => {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                newScript.onload = resolve;
                newScript.onerror = () => reject(new Error(`Script load error for ${script.src}`));
                document.body.appendChild(newScript);
                document.body.removeChild(newScript);
            });
        } else {
            const newScript = document.createElement('script');
            newScript.text = script.text;
            document.body.appendChild(newScript);
            document.body.removeChild(newScript);
        }
    }

    return contentWithoutScripts;
}

document.addEventListener("DOMContentLoaded", async function() {
    fetch("../layout/category_head.html")
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            Array.from(tempDiv.childNodes).forEach(node => {
                document.head.appendChild(node);
            });
        });

    fetch("../layout/category_header.html")
        .then(response => response.text())
        .then(async data => {
            const headerHtml = await executeScript(data);
            document.getElementById("header-layout").insertAdjacentHTML('beforeend', headerHtml);
        });

    
    fetch("../layout/category_footer.html")
        .then(response => response.text())
        .then(async data => {
            const footerHtml = await executeScript(data);
            document.getElementById("footer-layout").insertAdjacentHTML('beforeend', footerHtml);
        });
});
