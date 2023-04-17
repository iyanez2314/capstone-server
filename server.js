const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const openaiApiKey = process.env.OPENAI_KEY;

app.post("/ai-resume-helper", async (req, res) => {
  const jobDescription = req.body.jobDescription;
  const resumeOfUser = req.body.resume;
  const prompt = `I need to add keywords to my resume to pass the ATS, this is the job description ${jobDescription} and this is my resume ${resumeOfUser} please give me a revised resume using the proper keywords please do not change anything other than adding keywords`;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        prompt: prompt,
        max_tokens: 100,
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
    res
      .status(500)
      .json({ error: "An error occured while processing the request" });
  }
});

app.post("/generate-text", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        prompt: prompt,
        max_tokens: 100,
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
