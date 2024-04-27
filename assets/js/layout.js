const executeScript = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const scripts = tempDiv.querySelectorAll("script");
    for (let script of scripts) {
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
        } else {
            newScript.text = script.text;
        }
        document.body.appendChild(newScript).parentNode.removeChild(newScript);
    }
    scripts.forEach(s => s.remove());
    return tempDiv.innerHTML;
}

const getHeader = () => {
    fetch("../layout/header.html")
        .then(response => response.text())
        .then(data => {
            const headerHtml = executeScript(data);
            document.getElementById("header-layout").insertAdjacentHTML("afterbegin", headerHtml);
            getFooter();
        });
}

const getFooter = () => {
    fetch("../layout/footer.html")
        .then(response => response.text())
        .then(data => {
            const footerHtml = executeScript(data);
            document.getElementById("footer-layout").insertAdjacentHTML("afterbegin", footerHtml);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    getHeader();
});

