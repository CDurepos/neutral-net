import type {Result} from "../types";

function ResultCard({ result }: { result: Result }) {
  const { title, link, score } = result;

  let biasLabel = "Very Low Bias", badgeClass = "bg-success";
  if (score >= 80) [biasLabel, badgeClass] = ["Very High Bias", "bg-danger"];
  else if (score >= 60) [biasLabel, badgeClass] = ["High Bias", "bg-danger"];
  else if (score >= 40) [biasLabel, badgeClass] = ["Moderate Bias", "bg-warning text-dark"];
  else if (score >= 20) [biasLabel, badgeClass] = ["Low Bias", "bg-info"];

  return (
    <div className="card result-card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <div className="bias-meter" />
        <div className="bias-indicator" style={{ marginLeft: `calc(${score}% - 1px)` }} />
        <p>
          <strong>Bias Score: {score.toFixed(2)}%</strong>
          <span className={`badge ms-2 ${badgeClass}`}>{biasLabel}</span>
        </p>
        <a href={link} className="btn btn-sm btn-outline-primary mt-2" target="_blank">Read Article</a>
      </div>
    </div>
  );
}

export default ResultCard;
