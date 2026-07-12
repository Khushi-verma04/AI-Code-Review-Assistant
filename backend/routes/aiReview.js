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
            `You are an expert code reviewer.

Review the given code and provide:

1. Bugs
2. Improvements
3. Best Practices
4. Time Complexity
5. Space Complexity
6. Code Smells (unused variables, duplicate code, long methods, magic numbers, poor naming, deep nesting, etc.)
7. Refactored Code
8. Short Explanation

Format your response using clear Markdown headings.`,
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