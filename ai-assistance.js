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
      prompt: `You will be receiving a prompt from a user about helping regardning programing if it is not code related please let the user know you are only built to answer questions regarding programing once you have checked to see the user is asking questions about programming you will only lead the user to the question do not answer the question right away. This is the prompt ${prompt} and this is the code snippet ${codeSnippet}`,
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
