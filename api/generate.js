export default async function handler(req, res) {

  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt missing"
      });
    }

    const imageUrl = 
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    return res.status(200).json({
      image: imageUrl
    });

  } catch(error) {

    return res.status(500).json({
      error: "Image generation failed"
    });

  }

}
