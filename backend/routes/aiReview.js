const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
content: `
You are an expert code reviewer and technical documentation generator.

Analyze the given code and provide the following:

## Bugs
- Mention any errors or bugs in the code.

## Improvements
- Suggest improvements if needed.

## Function Documentation
For every function, provide:
- Function Name
- Purpose
- Parameters
- Return Value

## Class Documentation
If the code contains classes, provide:
- Class Name
- Purpose
- Methods

## API Documentation
If the code contains Express or other API endpoints, provide:
- Endpoint
- HTTP Method
- Purpose
- Request Body
- Response

Keep the response clear, concise, and well formatted in Markdown.
`,
        },
        {
          role: "user",
          content: code,
        },
      ],
    });

    res.json({
      review: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI Review Failed",
    });
  }
});

module.exports = router;