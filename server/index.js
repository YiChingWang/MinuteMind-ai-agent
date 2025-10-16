const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

// 初始化 Bedrock client
const client = new BedrockRuntimeClient({
  region: "us-east-1", // 根據你帳號的 region 調整
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Root OK");
});

// server.js（或 index.js）
app.get("/ping", (req, res) => {
  res.json({ message: "pong from backend!" });
});

app.post("/api/summary", async (req, res) => {
  const { text } = req.body;

  const prompt = `
You are a meeting summarization assistant. Please organize the following meeting notes into a structured summary with:

- 📝 Topic
- ✅ Decisions
- 📌 Action Items
- 💡 Next Steps

Meeting notes:
${text}
`;

  try {
    const command = new InvokeModelCommand({
      modelId: "amazon.titan-text-express-v1", // ✅ Titan 模型 ID
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inputText: prompt, // ✅ Titan 用 inputText 而不是 messages
        textGenerationConfig: {
          maxTokenCount: 800, // ✅ Titan 用 maxTokenCount 而不是 max_tokens
          temperature: 0.7,
        },
      }),
    });

    const response = await client.send(command);

    // ✅ Titan 的回傳是 { results: [ { outputText: "..." } ] }
    const jsonString = new TextDecoder().decode(response.body);
    const result = JSON.parse(jsonString);
    const summary = result.results[0].outputText;

    res.json({ summary });
  } catch (err) {
    console.error("❌ Bedrock 調用錯誤:", err);
    res.status(500).json({ error: "Failed to summarize" });
  }
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "hello from express backend!!" });
});
app.listen(port, () =>
  console.log(`Server running on: http://localhost:${port}`)
);
