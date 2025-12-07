import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar() {
  const loc = useLocation();

  return (
    <nav>
      <strong>Gestão de Produtos</strong>

      <div>
        <Link className={loc.pathname === "/" ? "active" : ""} to="/">Início</Link>
        <Link className={loc.pathname === "/produtos" ? "active" : ""} to="/produtos">Produtos</Link>
        <Link className={loc.pathname === "/categorias" ? "active" : ""} to="/categorias">Categorias</Link>
      </div>
    </nav>
  );
}
