import "../styles/Card.css";

export default function Card({ title, children, actions }) {
  return (
    <div className="card">
      {title && <div className="card-header"><h3>{title}</h3></div>}
      <div>{children}</div>
      {actions && <div className="card-footer">{actions}</div>}
    </div>
  );
}
