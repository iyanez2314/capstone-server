const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const openaiApiKey = process.env.OPENAI_KEY;

app.post("/generate-text", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const engine = req.body.engine || "text-davinci-002";
    const maxTokens = req.body.maxTokens || 50;

    const response = await axios.post(
      "https://api.openai.com/v1/engines/" + engine + "/completions",
      {
        prompt: prompt,
        max_tokens: maxTokens,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + openaiApiKey,
        },
      }
    );

    res.json(response.data.choices[0].text.trim());
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occured while processing the request" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
