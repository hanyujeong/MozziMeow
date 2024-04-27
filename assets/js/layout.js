function executeScript(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const scripts = tempDiv.getElementsByTagName("script");
    for (let script of scripts) {
        const newScript = document.createElement('script');
        newScript.text = script.text;
        document.body.appendChild(newScript).parentNode.removeChild(newScript);
    }
    return tempDiv.innerHTML;
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("../layout/footer.html")
        .then(response => response.text())
        .then(data => {
            const footerHtml = executeScript(data);
            document.getElementById("footer-layout").innerHTML = footerHtml;
        });
});