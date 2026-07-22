async function generateImage() {

    const prompt = document.getElementById("prompt").value;
    const result = document.getElementById("result");

    if (!prompt) {
        alert("Please enter a prompt");
        return;
    }

    result.innerHTML = "Generating AI Image... Please wait 🚀";


    try {

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt
            })
        });


        const data = await response.json();


        if(data.image){

            result.innerHTML = `
            <img src="${data.image}" 
            style="width:100%;border-radius:15px;">
            `;

        } else {

            result.innerHTML = "Error: Image not generated";

        }


    } catch(error){

        result.innerHTML = "Server Error";

        console.log(error);

    }

}