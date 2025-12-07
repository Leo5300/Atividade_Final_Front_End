import "../styles/Card.css";

export default function Card({ title, children, actions }) {
    return (
        <div className="glass-card">
            <h3>{title}</h3>

            <div style={{ marginTop: "10px" }}>
                {children}
            </div>

            {actions && (
                <div className="card-actions">
                    {actions}
                </div>
            )}
        </div>
    );
}
