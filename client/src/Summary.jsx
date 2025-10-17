import "./Summary.css";

function Summary({ summary }) {
  const parseSummary = (summary) => {
    // ✨ 改善 regex，允許前後有冒號、換行、空白
    const topicMatch = summary.match(
      /Topic[\s:]*([\s\S]*?)(?=✅ Decisions|📌 Action Items|💡 Next Steps|$)/
    );
    const decisionsMatch = summary.match(
      /✅ Decisions[\s:]*([\s\S]*?)(?=📌 Action Items|💡 Next Steps|$)/
    );
    const actionItemsMatch = summary.match(
      /📌 Action Items[\s:]*([\s\S]*?)(?=💡 Next Steps|$)/
    );
    const nextStepsMatch = summary.match(/💡 Next Steps[\s:]*([\s\S]*)/);

    const splitItems = (text) =>
      text
        ? text
            .split(/(?:\n|^-|•|\*)/m) // 可支援多種 list 格式（換行、-、•、*）
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
        : [];

    return {
      topic: topicMatch?.[1]?.trim() || "—",
      decisions: splitItems(decisionsMatch?.[1]),
      actionItems: splitItems(actionItemsMatch?.[1]),
      nextSteps: splitItems(nextStepsMatch?.[1]),
    };
  };

  const { topic, decisions, actionItems, nextSteps } = parseSummary(summary);

  return (
    <>
      <div className="summary_title">
        <h2 className="summary_text">
          ✅ Here’s what I caught from the discussion 👇
        </h2>
      </div>

      <div className="summary_ans">
        <h3 className="summary_content">📊 Meeting Summary</h3>

        <div className="summary_item">
          <h4>📝 Topic</h4>
          <p>{topic}</p>
        </div>

        <div className="summary_item">
          <h4>✅ Decisions</h4>
          <ul>
            {decisions.map((d, i) => (
              <li key={`decision-${i}`}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="summary_item">
          <h4>📌 Action Items</h4>
          {actionItems.length > 0 ? (
            <ul>
              {actionItems.map((a, i) => (
                <li key={`action-${i}`}>{a}</li>
              ))}
            </ul>
          ) : (
            <p>—</p>
          )}
        </div>

        <div className="summary_item">
          <h4>💡 Next Steps</h4>
          <ul>
            {nextSteps.map((n, i) => (
              <li key={`next-${i}`}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Summary;
