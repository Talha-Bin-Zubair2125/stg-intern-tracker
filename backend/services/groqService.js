require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeComments = async (comments) => {
  try {
    // Extract only the comment text
    const commentList = comments
      .map((item, index) => {
        return `${index + 1}. ${item.comment}`;
      })
      .join("\n");

    const prompt = `
You are an AI sentiment analyzer.

Analyze each comment and classify it as:
- Positive
- Neutral
- Negative

Comments:
${commentList}

Return ONLY valid JSON in this exact format:

{
  "comments":[
    {
      "comment":"",
      "sentiment":"",
      "reason":""
    }
  ],
  "positive":0,
  "neutral":0,
  "negative":0,
  "summary":"",
  "improvements":[]
}

Do not include markdown.
Do not include explanation.
Return JSON only.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const result = response.choices[0].message.content;

    return JSON.parse(result);
  } catch (error) {
    console.log(error);
    throw new Error("Error analyzing comments.");
  }
};

module.exports = analyzeComments;
