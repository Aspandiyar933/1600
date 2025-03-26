import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Get SAT Passage
app.get("/api/passage", async (_req, res) => {
  try {
    const prompt = `Generate a 200-word SAT-style passage. Tone should match SAT reading sections: narrative, scientific, or historical.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const passage = response.choices[0].message?.content || "No passage generated.";
    res.json({ passage });
  } catch (error) {
    console.error("Error fetching passage:", error);
    res.status(500).json({ error: "Failed to fetch passage" });
  }
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
