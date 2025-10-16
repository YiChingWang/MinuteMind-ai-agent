const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

// ✅ 初始化 Bedrock client
const client = new BedrockRuntimeClient({
  region: "us-east-1", // 根據你的 region 調整
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ✅ CORS 設定（包含 localhost + Vercel 網址）
const allowedOrigins = [
  "https://minutmind-ai-agent.vercel.app", // ✅ 你的正式網址
  "http://localhost:5173", // ✅ 本地開發用（如果你用 Vite）
];

app.use(
  cors({
    origin: function (origin, callback) {
      // 允許沒有 origin（如 Postman）或在白名單內的
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ 加這行讓 preflight OPTIONS 請求能成功
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Root OK");
});

// ✅ 測試連線用
app.get("/ping", (req, res) => {
  res.json({ message: "pong from backend!" });
});

// ✅ 核心 API：總結會議紀錄
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
        inputText: prompt,
        textGenerationConfig: {
          maxTokenCount: 800,
          temperature: 0.7,
        },
      }),
    });

    const response = await client.send(command);

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
  console.log(`✅ Server running on: http://localhost:${port}`)
);
