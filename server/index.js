const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

console.log("🔍 AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log(
  "🔍 AWS_SECRET_ACCESS_KEY:",
  process.env.AWS_SECRET_ACCESS_KEY ? "✅ Exists" : "❌ Missing"
);
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const allowedOrigins = [
  "https://minutmind-ai-agent-7tvz.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
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

app.options(/.*/, cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Root OK");
});

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
      modelId: "amazon.titan-text-express-v1",
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
