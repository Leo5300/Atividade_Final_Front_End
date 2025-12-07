import { useEffect, useState } from "react";
import {
  getProdutos,
  getCategorias,
  createProduto,
  deleteProduto,
  updateProduto,
  getProdutoById,
} from "../api/Api";

import Card from "../components/Card";
import "../styles/layout.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    estoque: "",
    categoria: "",
  });

  const [modalEditar, setModalEditar] = useState(null);

  // Busca por ID
  const [buscaId, setBuscaId] = useState("");
  const [resultadoId, setResultadoId] = useState(null);
  const [msgBusca, setMsgBusca] = useState("");

  const [removendo, setRemovendo] = useState(false);

  async function load() {
    setProdutos(await getProdutos());
    setCategorias(await getCategorias());
  }

  useEffect(() => {
    load();
  }, []);

  async function salvar(e) {
    e.preventDefault();

    await createProduto({
      nome: form.nome,
      preco: Number(form.preco),
      estoque: Number(form.estoque),
      categoria: form.categoria ? { id: Number(form.categoria) } : null,
    });

    setForm({ nome: "", preco: "", estoque: "", categoria: "" });
    load();
  }

  async function excluir(id) {
    if (resultadoId && resultadoId.id === id) {
      setRemovendo(true);

      setTimeout(async () => {
        setResultadoId(null);
        await deleteProduto(id);
        load();
      }, 350);

      return;
    }

    await deleteProduto(id);
    load();
  }

  async function salvarEdicao() {
    await updateProduto(modalEditar.id, {
      nome: modalEditar.nome,
      preco: Number(modalEditar.preco),
      estoque: Number(modalEditar.estoque),
      categoria: modalEditar.categoria
        ? { id: Number(modalEditar.categoria) }
        : null,
    });

    setModalEditar(null);
    load();
  }

  async function buscarPorId(e) {
    e.preventDefault();
    setResultadoId(null);

    if (!buscaId.trim()) {
      setMsgBusca("Informe um ID");
      return;
    }

    const prod = await getProdutoById(buscaId);
    if (!prod) {
      setMsgBusca("Produto não encontrado");
      return;
    }

    setRemovendo(false);
    setResultadoId(prod);
    setMsgBusca("");
  }

  return (
    <div className="page">

      {/* Formulário */}
      <div className="glass">
        <h2>Novo Produto</h2>

        <form className="form" onSubmit={salvar}>
          <input
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />

          <input
            type="number"
            placeholder="Preço"
            value={form.preco}
            onChange={(e) => setForm({ ...form, preco: e.target.value })}
          />

          <input
            type="number"
            placeholder="Estoque"
            value={form.estoque}
            onChange={(e) => setForm({ ...form, estoque: e.target.value })}
          />

          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option value="">Sem categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>

          <button className="btn primary">Salvar</button>
        </form>
      </div>

      {/* Buscar por ID */}
      <div className="glass" style={{ marginTop: 20 }}>
        <h2>Buscar Produto por ID</h2>

        <form className="form" onSubmit={buscarPorId}>
          <input
            type="number"
            placeholder="ID"
            value={buscaId}
            onChange={(e) => setBuscaId(e.target.value)}
          />
          <button className="btn primary">Buscar</button>
        </form>

        {msgBusca && <p>{msgBusca}</p>}

        {resultadoId && (
          <div
            className={`fade-out ${removendo ? "removendo" : ""}`}
          >
            <Card
              title={`${resultadoId.nome} (ID: ${resultadoId.id})`}
              actions={
                <>
                  <button
                    className="btn primary"
                    onClick={() => setModalEditar(resultadoId)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn danger"
                    onClick={() => excluir(resultadoId.id)}
                  >
                    Excluir
                  </button>
                </>
              }
            >
              Preço: R$ {resultadoId.preco}
              <br />
              Estoque: {resultadoId.estoque}
              <br />
              Categoria: {resultadoId.categoria?.nome || "Nenhuma"}
            </Card>
          </div>
        )}
      </div>

      {/* Lista geral */}
      <div className="grid">
        {produtos.map((p) => (
          <Card
            key={p.id}
            title={`${p.nome} (ID: ${p.id})`}
            actions={
              <>
                <button className="btn primary" onClick={() => setModalEditar(p)}>
                  Editar
                </button>
                <button className="btn danger" onClick={() => excluir(p.id)}>
                  Excluir
                </button>
              </>
            }
          >
            Preço: R$ {p.preco}
            <br />
            Estoque: {p.estoco}
            <br />
            Categoria: {p.categoria?.nome || "Nenhuma"}
          </Card>
        ))}
      </div>

      {/* Modal editar */}
      {modalEditar && (
        <div className="modal-bg" onClick={() => setModalEditar(null)}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <h2>Editar Produto</h2>

            <input
              value={modalEditar.nome}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, nome: e.target.value })
              }
            />

            <input
              type="number"
              value={modalEditar.preco}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, preco: e.target.value })
              }
            />

            <input
              type="number"
              value={modalEditar.estoque}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, estoque: e.target.value })
              }
            />

            <select
              value={modalEditar.categoria}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, categoria: e.target.value })
              }
            >
              <option value="">Sem categoria</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>

            <button className="btn primary" onClick={salvarEdicao}>
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
