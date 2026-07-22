import OpenAI from "openai";

export default async function handler(req, res) {

  try {

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });


    const { prompt } = req.body;


    const response = await client.images.generate({

      model: "gpt-image-1",

      prompt: prompt,

      size: "1024x1024"

    });


    res.status(200).json({

      image: response.data[0].url

    });


  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: error.message

    });

  }

}
