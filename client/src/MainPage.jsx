import { useState } from "react";

import Summary from "./Summary";
import "./MainPage.css";
function MainPage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleText = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSummary("");
    const res = await fetch(
      "https://minutmind-ai-agent.onrender.com/api/summary",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }
    );
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };
  return (
    <>
      <div className="mainpage">
        <div className="transcript">
          <div className="transcript_header">
            <h1 className="header_title">🧑‍💻Hello, I am Mimi!</h1>
            <p className="header_text">Let's create your meeting summary!</p>
          </div>
          <textarea
            className="textarea"
            rows="12"
            type="text"
            placeholder="Paste your meeting notes here..."
            required
            onChange={handleText}
          ></textarea>
          <button className="button" onClick={handleSubmit} type="button">
            Go
          </button>
        </div>
        {(loading || summary) && (
          <div className="summary">
            {loading && (
              <p className="loadingtext">
                ⏳ Mimi is summarizing your meeting...
              </p>
            )}
            {!loading && summary && <Summary summary={summary} />}
          </div>
        )}
      </div>
    </>
  );
}
export default MainPage;
