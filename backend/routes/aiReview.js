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
          content:
            "You are an expert code reviewer. Review the code and provide bugs, improvements, best practices, and a short explanation.",
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