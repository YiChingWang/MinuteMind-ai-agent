
# 🧠 MinutMind – AI Meeting Summarizer

MinutMind is an AI-powered meeting summarization tool built for the **AWS AI Agent Global Hackathon**.  
It helps users turn messy meeting transcripts into **clear, structured, and actionable summaries** in just seconds — saving time and boosting team productivity.

---

## 🚀 Overview

Meetings are essential for collaboration, but they often leave behind **long, unstructured notes** that are hard to review.  
MinutMind solves this problem by automatically generating structured summaries from raw meeting transcripts, including:

- 📝 **Topic** – the main focus of the meeting  
- ✅ **Decisions** – key outcomes and agreements  
- 📌 **Action Items** – tasks and next steps  
- 💡 **Next Steps** – suggestions and follow-ups

Simply paste your meeting notes, and MinutMind transforms them into a concise, human-readable summary instantly.

---

## 🛠️ Tech Stack

**Frontend:**
- ⚛️ React – for building the user interface  
- 🎨 CSS – for clean and responsive styling

**Backend:**
- 🟢 Express.js – RESTful API server  
- 🌐 CORS & dotenv – for environment configuration and secure API calls

**AI & Cloud:**
- ☁️ AWS Bedrock – foundation model orchestration  
- 🧠 Amazon Titan Text Express – large language model for text generation  
- 🔑 AWS IAM – secure access control and key management

---

## ✨ Key Features

- 📄 **Instant AI Summaries** – Paste raw meeting text and receive a well-structured summary in seconds.  
- ⚙️ **End-to-End Full-Stack App** – Seamless integration between React frontend and Express backend.  
- 🔐 **Secure Environment Variables** – All secrets managed via `.env` and not exposed to Git history.  
- ☁️ **Serverless LLM on AWS** – Uses Amazon Titan via Bedrock, no model hosting required.  
- 📱 **Clean UI/UX** – Intuitive design that makes summarizing meetings effortless.

---

## 🧪 How It Works

1. Paste your meeting transcript into the text area.  
2. Click **“Go”**.  
3. The backend sends your text to Amazon Titan LLM via AWS Bedrock.  
4. The model returns a structured summary, displayed instantly on the frontend.

---

## 📦 Project Structure

```
fullstack/
├── client/               # React frontend
│   ├── src/
│   │   ├── MainPage.js   # Main UI page
│   │   └── Summary.js    # Summary display component
├── server/               # Express backend
│   ├── index.js          # API routes and Bedrock integration
│   └── .env              # (not committed) AWS keys & secrets
└── package.json
```

---

## 💡 Why This Matters

💼 Teams spend countless hours in meetings, but **poorly organized notes waste even more time** afterward.  
MinutMind eliminates that friction by giving you **structured, actionable meeting summaries** with zero manual effort.

This makes follow-ups easier, decision tracking clearer, and team collaboration smoother — especially for remote and hybrid teams.

---

## 🧰 Future Improvements

- ✍️ **Multi-language support** (English, Japanese, Chinese)  
- 📁 **Import meeting transcripts directly from files or APIs**  
- 🔔 **Slack / Email integrations** for automatic summary delivery  
- 🤖 **Agent-style follow-ups** like “generate next meeting agenda”

---

## 📜 License

MIT License © 2025 Yi Ching Wang
