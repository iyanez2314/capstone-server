const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/ai-assistance", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const encodedSnippet = req.body.codeSnippet;
    const codeSnippet = decodeURIComponent(encodedSnippet);
    const openaiApiKey = process.env.OPENAI_KEY;
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: openaiApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You should be receiving a sentence regarding issues that the users code is having and a code snippet. If the subject matter is not in regards of programming please tell the user you are customized to solve programing problems. This is the prompt ${prompt} and this is the code snippet ${codeSnippet}`,
      temperature: 1,
      max_tokens: 4000,
    });
    console.log("here", response.data);
    res.json(response.data.choices[0].text.trim());
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while processing the request" });
  }
});

module.exports = app;
