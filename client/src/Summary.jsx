import "./Summary.css";
function Summary({ summary }) {
  const parseSummary = (summary) => {
    const topicMatch = summary.match(/Topic:\s*(.*?)(?=Decisions:|$)/s);
    const decisionsMatch = summary.match(
      /Decisions:\s*([\s\S]*?)(?=Action Items:|$)/s
    );
    const actionItemsMatch = summary.match(
      /Action Items:\s*([\s\S]*?)(?=Next Steps:|$)/s
    );
    const nextStepsMatch = summary.match(/Next Steps:\s*([\s\S]*)/s);

    return {
      topic: topicMatch?.[1]?.trim() || "—",
      decisions: decisionsMatch?.[1]?.trim() || "—",
      actionItems: actionItemsMatch?.[1]?.trim() || "—",
      nextSteps: nextStepsMatch?.[1]?.trim() || "—",
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
          <p>{decisions}</p>
        </div>
        <div className="summary_item">
          <h4>📌 Action Items</h4>
          <p>{actionItems}</p>
        </div>
        <div className="summary_item">
          <h4>💡 Next Steps</h4>
          <p>{nextSteps}</p>
        </div>
      </div>
    </>
  );
}

export default Summary;
