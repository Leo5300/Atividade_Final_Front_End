import { useEffect, useState } from "react";
import {
  getProdutos,
  getCategorias,
  createProduto,
  deleteProduto,
  updateProduto,
  getProdutoById,
  getProdutosByNome,
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

  // ============================
  // BUSCA POR ID
  // ============================
  const [buscaId, setBuscaId] = useState("");
  const [resultadoId, setResultadoId] = useState(null);
  const [msgBuscaId, setMsgBuscaId] = useState("");

  // ============================
  // BUSCA POR NOME
  // ============================
  const [buscaNome, setBuscaNome] = useState("");
  const [resultadoNome, setResultadoNome] = useState([]);
  const [msgBuscaNome, setMsgBuscaNome] = useState("");

  // ============================
  // UX
  // ============================
  const [loading, setLoading] = useState(false);
  const [removendo, setRemovendo] = useState(false);

  async function load() {
    setLoading(true);
    setProdutos(await getProdutos());
    setCategorias(await getCategorias());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // ============================
  // CREATE
  // ============================
  async function salvar(e) {
    e.preventDefault();
    setLoading(true);

    await createProduto({
      nome: form.nome,
      preco: Number(form.preco),
      estoque: Number(form.estoque),
      categoria: form.categoria ? { id: Number(form.categoria) } : null,
    });

    setForm({ nome: "", preco: "", estoque: "", categoria: "" });
    await load();
  }

  // ============================
  // DELETE (FECHA TUDO + UX)
  // ============================
  async function excluir(id) {
    setRemovendo(true);
    setLoading(true);

    setTimeout(async () => {
      await deleteProduto(id);

      setResultadoId(null);
      setResultadoNome([]);
      setModalEditar(null);

      await load();

      setRemovendo(false);
      setLoading(false);
    }, 350);
  }

  // ============================
  // UPDATE
  // ============================
  async function salvarEdicao() {
    setLoading(true);

    await updateProduto(modalEditar.id, {
      nome: modalEditar.nome,
      preco: Number(modalEditar.preco),
      estoque: Number(modalEditar.estoque),
      categoria: modalEditar.categoria
        ? { id: Number(modalEditar.categoria) }
        : null,
    });

    setModalEditar(null);
    await load();
  }

  // ============================
  // BUSCAR POR ID
  // ============================
  async function buscarPorId(e) {
    e.preventDefault();
    setLoading(true);

    setResultadoId(null);
    setResultadoNome([]);
    setMsgBuscaId("");

    if (!buscaId.trim()) {
      setMsgBuscaId("Informe um ID");
      setLoading(false);
      return;
    }

    const prod = await getProdutoById(buscaId);

    if (!prod) {
      setMsgBuscaId("Produto não encontrado");
      setLoading(false);
      return;
    }

    setResultadoId(prod);
    setLoading(false);
  }

  // ============================
  // BUSCAR POR NOME
  // ============================
  async function buscarPorNome(e) {
    e.preventDefault();
    setLoading(true);

    setResultadoNome([]);
    setResultadoId(null);
    setMsgBuscaNome("");

    if (!buscaNome.trim()) {
      setMsgBuscaNome("Informe um nome");
      setLoading(false);
      return;
    }

    const lista = await getProdutosByNome(buscaNome);

    if (!lista || lista.length === 0) {
      setMsgBuscaNome("Nenhum produto encontrado");
      setLoading(false);
      return;
    }

    setResultadoNome(lista);
    setLoading(false);
  }

  return (
    <div className="page">
      {loading && <p className="muted">Carregando...</p>}

      {/* ============================
          NOVO PRODUTO
      ============================ */}
      <div className="glass">
        <div className="section-header">
          <div>
            <h2>Novo Produto</h2>
            <p className="section-subtitle">
              Cadastre itens com preço, estoque e categoria.
            </p>
          </div>
        </div>

        <form className="form form-grid" onSubmit={salvar}>
          <input
            placeholder="Nome do produto"
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

          <div className="form-actions">
            <button className="btn primary">Salvar</button>
          </div>
        </form>
      </div>

      {/* ============================
          BUSCA POR ID
      ============================ */}
      <div className="glass">
        <div className="section-header">
          <div>
            <h2>Buscar Produto por ID</h2>
            <p className="section-subtitle">
              Ideal para consultas rápidas no caixa ou estoque.
            </p>
          </div>
        </div>

        <form className="form form-inline" onSubmit={buscarPorId}>
          <input
            type="number"
            placeholder="Digite o ID do produto"
            value={buscaId}
            onChange={(e) => setBuscaId(e.target.value)}
          />
          <button className="btn primary">Buscar</button>
        </form>

        {msgBuscaId && <p>{msgBuscaId}</p>}

        {resultadoId && (
          <div className={`fade-out ${removendo ? "removendo" : ""}`}>
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
              Preço: R$ {resultadoId.preco}<br />
              Estoque: {resultadoId.estoque}<br />
              Categoria: {resultadoId.categoria?.nome || "Nenhuma"}
            </Card>
          </div>
        )}
      </div>

      {/* ============================
          BUSCA POR NOME
      ============================ */}
      <div className="glass">
        <div className="section-header">
          <div>
            <h2>Buscar Produto por Nome</h2>
            <p className="section-subtitle">
              Encontre itens mesmo com variações no nome.
            </p>
          </div>
        </div>

        <form className="form form-inline" onSubmit={buscarPorNome}>
          <input
            placeholder="Digite o nome do produto"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
          <button className="btn primary">Buscar</button>
        </form>

        {msgBuscaNome && <p>{msgBuscaNome}</p>}

        <div className="grid">
          {resultadoNome.length === 0 && !msgBuscaNome && (
            <p className="empty-state">Nenhum resultado para exibir.</p>
          )}
          {resultadoNome.map((p) => (
            <Card
              key={p.id}
              title={`${p.nome} (ID: ${p.id})`}
              actions={
                <>
                  <button
                    className="btn primary"
                    onClick={() => setModalEditar(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn danger"
                    onClick={() => excluir(p.id)}
                  >
                    Excluir
                  </button>
                </>
              }
            >
              Preço: R$ {p.preco}<br />
              Estoque: {p.estoque}<br />
              Categoria: {p.categoria?.nome || "Nenhuma"}
            </Card>
          ))}
        </div>
      </div>

      {/* ============================
          LISTA GERAL
      ============================ */}
      <div className="section-header">
        <div>
          <h2>Todos os Produtos</h2>
          <p className="section-subtitle">
            Total cadastrado: <span className="badge">{produtos.length}</span>
          </p>
        </div>
      </div>
      <div className="grid">
        {produtos.length === 0 && (
          <p className="empty-state">Cadastre o primeiro produto para começar.</p>
        )}
        {produtos.map((p) => (
          <Card
            key={p.id}
            title={`${p.nome} (ID: ${p.id})`}
            actions={
              <>
                <button
                  className="btn primary"
                  onClick={() => setModalEditar(p)}
                >
                  Editar
                </button>
                <button
                  className="btn danger"
                  onClick={() => excluir(p.id)}
                >
                  Excluir
                </button>
              </>
            }
          >
            Preço: R$ {p.preco}<br />
            Estoque: {p.estoque}<br />
            Categoria: {p.categoria?.nome || "Nenhuma"}
          </Card>
        ))}
      </div>

      {/* ============================
          MODAL EDITAR
      ============================ */}
      {modalEditar && (
        <div className="modal-bg" onClick={() => setModalEditar(null)}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <h2>Editar Produto</h2>

            <div className="modal-content-scroll">
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
                value={modalEditar.categoria || ""}
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
            </div>

            <button className="btn primary" onClick={salvarEdicao}>
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
