function AnalysisText({ username, node_amount, timeRanges }) {
  return (
    <div className="col-xs-12 col-lg-6">
      <p className="h3">Profile Analysis</p>
      <p className="my-2">
        @{username}s profile analysis based on the data of the last{" "}
        {node_amount} posts from {timeRanges?.old} - {timeRanges?.new}.
      </p>
    </div>
  );
}

export default AnalysisText;
