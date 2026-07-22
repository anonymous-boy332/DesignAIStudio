async function generateImage() {

    const prompt = document.getElementById("prompt").value.trim();
    const result = document.getElementById("result");

    if (!prompt) {
        alert("Please enter a prompt");
        return;
    }

    result.innerHTML = "Generating AI Image... Please wait...";

    try {

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        console.log(data);

        if (response.ok && data.image) {

            result.innerHTML = `
                <img src="${data.image}"
                     alt="AI Image"
                     style="width:100%;max-width:700px;border-radius:15px;">
                <br><br>
                <a href="${data.image}" target="_blank">Open Full Image</a>
            `;

        } else {

            result.innerHTML = `
                <h3>Generation Failed</h3>
                <p>${data.error || "Unknown Error"}</p>
            `;

        }

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <h3>Server Error</h3>
            <p>${error.message}</p>
        `;

    }

}
