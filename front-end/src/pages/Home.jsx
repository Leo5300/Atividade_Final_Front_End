import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      
      {/* CARD PRINCIPAL */}
      <div className="glass-card" style={{ marginTop: "20px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>Atividade final FRONT-END</h1>
        <p style={{ fontSize: "18px", opacity: 0.75 }}>
          Gerencie produtos e categorias com Java + Spark + React.
        </p>
      </div>

      {/* CARDS SECUNDÁRIOS */}
      <div
        style={{
          display: "flex",
          gap: "22px",
          marginTop: "32px",
          flexWrap: "wrap",
        }}
      >
        {/* PRODUTOS */}
        <div className="glass-card" style={{ flex: "1 1 300px" }}>
          <h2 style={{ marginBottom: "6px" }}>Produtos</h2>
          <p style={{ marginBottom: "14px", opacity: 0.7 }}>
            Cadastre, edite e remova produtos da sua loja.
          </p>
          <button className="btn" onClick={() => navigate("/produtos")}>
            Abrir
          </button>
        </div>

        {/* CATEGORIAS */}
        <div className="glass-card" style={{ flex: "1 1 300px" }}>
          <h2 style={{ marginBottom: "6px" }}>Categorias</h2>
          <p style={{ marginBottom: "14px", opacity: 0.7 }}>
            Organize os produtos por categorias.
          </p>
          <button className="btn" onClick={() => navigate("/categorias")}>
            Abrir
          </button>
        </div>
      </div>
    </div>
  );
}
