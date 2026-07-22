import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {


  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed"
    });

  }


  try {


    const { prompt } = req.body;


    if (!prompt) {

      return res.status(400).json({
        error: "Prompt is required"
      });

    }



    const response = await client.images.generate({

      model: "gpt-image-1",

      prompt: prompt,

      size: "1024x1024"

    });



    const imageBase64 = response.data[0].b64_json;



    if(!imageBase64){

      throw new Error("No image data received");

    }



    res.status(200).json({

      image: `data:image/png;base64,${imageBase64}`

    });



  } catch(error){


    console.log("ERROR:", error);


    res.status(500).json({

      error: error.message

    });


  }


}
