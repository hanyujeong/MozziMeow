async function executeScript(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const scripts = tempDiv.querySelectorAll("script");
    scripts.forEach(s => s.remove());
    const contentWithoutScripts = tempDiv.innerHTML;

    for (let script of scripts) {
        if (script.src) {
            await new Promise((resolve, reject) => {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                newScript.onload = () => resolve();
                newScript.onerror = () => reject(new Error(`Script load error for ${script.src}`));
                document.body.appendChild(newScript);
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
    fetch("../layout/list_head.html")
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            Array.from(tempDiv.childNodes).forEach(node => {
                document.head.appendChild(node);
            });
        });

    const headerResponse = await fetch("../layout/list_header.html");
    const headerData = await headerResponse.text();
    const headerHtml = await executeScript(headerData);
    document.getElementById("header-layout").insertAdjacentHTML('beforeend', headerHtml);

    const footerResponse = await fetch("../layout/list_footer.html");
    const footerData = await footerResponse.text();
    const footerHtml = await executeScript(footerData);
    document.getElementById("footer-layout").insertAdjacentHTML('beforeend', footerHtml);    
});
