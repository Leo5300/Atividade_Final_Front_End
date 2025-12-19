import { useEffect, useState } from "react";
import {
  getCategorias,
  getProdutos,
  createCategoria,
  deleteCategoria,
  updateCategoria,
  getCategoriaById,
  getCategoriasByNome
} from "../api/Api";

import Card from "../components/Card";
import "../styles/layout.css";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");

  const [modalItens, setModalItens] = useState(null);
  const [modalEditar, setModalEditar] = useState(null);
  const [buscaProdutoModal, setBuscaProdutoModal] = useState("");

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

  const [removendo, setRemovendo] = useState(false);

  async function load() {
    setCategorias(await getCategorias());
    setProdutos(await getProdutos());
  }

  useEffect(() => {
    load();
  }, []);

  // ============================
  // CREATE
  // ============================
  async function salvarCategoria(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    await createCategoria({ nome });
    setNome("");
    load();
  }

  // ============================
  // BUSCAR POR ID
  // ============================
  async function buscarPorId(e) {
    e.preventDefault();
    setResultadoId(null);
    setMsgBuscaId("");

    if (!buscaId.trim()) {
      setMsgBuscaId("Informe um ID");
      return;
    }

    const cat = await getCategoriaById(buscaId);

    if (!cat) {
      setMsgBuscaId("Categoria não encontrada");
      return;
    }

    setRemovendo(false);
    setResultadoId(cat);
  }

  // ============================
  // BUSCAR POR NOME
  // ============================
  async function buscarPorNome(e) {
    e.preventDefault();
    setResultadoNome([]);
    setMsgBuscaNome("");

    if (!buscaNome.trim()) {
      setMsgBuscaNome("Informe um nome");
      return;
    }

    const lista = await getCategoriasByNome(buscaNome);

    if (!lista || lista.length === 0) {
      setMsgBuscaNome("Nenhuma categoria encontrada");
      return;
    }

    setResultadoNome(lista);
  }

  function abrirItens(categoria) {
    const itens = produtos.filter(p => p.categoria?.id === categoria.id);
    setBuscaProdutoModal("");
    setModalItens({ categoria, itens });
  }

  // ============================
  // DELETE (fade-out)
  // ============================
  async function excluir(id) {
    setRemovendo(true);

    setTimeout(async () => {
      await deleteCategoria(id);
      setResultadoId(null);
      setResultadoNome([]);
      setModalItens(null);
      setModalEditar(null);
      setRemovendo(false);
      load();
    }, 350);
  }

  // ============================
  // UPDATE
  // ============================
  async function salvarEdicao() {
    await updateCategoria(modalEditar.id, {
      id: modalEditar.id,
      nome: modalEditar.nome,
    });

    setModalEditar(null);
    load();
  }

  return (
    <div className="page">

      {/* NOVA CATEGORIA */}
      <div className="glass">
        <div className="section-header">
          <div>
            <h2>Nova Categoria</h2>
            <p className="section-subtitle">
              Organize os produtos para uma navegação rápida.
            </p>
          </div>
        </div>

        <form className="form form-inline" onSubmit={salvarCategoria}>
          <input
            placeholder="Nome da categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button className="btn primary">Salvar</button>
        </form>
      </div>

      {/* BUSCA POR ID */}
      <div className="glass">
        <div className="section-header">
          <div>
            <h2>Buscar Categoria por ID</h2>
            <p className="section-subtitle">
              Ideal para manutenção rápida do cadastro.
            </p>
          </div>
        </div>

        <form className="form form-inline" onSubmit={buscarPorId}>
          <input
            type="number"
            placeholder="Digite o ID da categoria"
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
                  <button className="btn view" onClick={() => abrirItens(resultadoId)}>Ver itens</button>
                  <button className="btn primary" onClick={() => setModalEditar(resultadoId)}>Editar</button>
                  <button className="btn danger" onClick={() => excluir(resultadoId.id)}>Excluir</button>
                </>
              }
            />
          </div>
        )}
      </div>

      {/* BUSCA POR NOME */}
      <div className="glass">
        <div className="section-header">
          <div>
            <h2>Buscar Categoria por Nome</h2>
            <p className="section-subtitle">
              Procure categorias por palavras-chave.
            </p>
          </div>
        </div>

        <form className="form form-inline" onSubmit={buscarPorNome}>
          <input
            placeholder="Digite o nome da categoria"
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
          {resultadoNome.map((c) => (
            <Card
              key={c.id}
              title={`${c.nome} (ID: ${c.id})`}
              actions={
                <>
                  <button className="btn view" onClick={() => abrirItens(c)}>Ver itens</button>
                  <button className="btn primary" onClick={() => setModalEditar(c)}>Editar</button>
                  <button className="btn danger" onClick={() => excluir(c.id)}>Excluir</button>
                </>
              }
            />
          ))}
        </div>
      </div>

      {/* LISTA GERAL */}
      <div className="section-header">
        <div>
          <h2>Todas as Categorias</h2>
          <p className="section-subtitle">
            Total cadastrado: <span className="badge">{categorias.length}</span>
          </p>
        </div>
      </div>
      <div className="grid">
        {categorias.length === 0 && (
          <p className="empty-state">Cadastre a primeira categoria.</p>
        )}
        {categorias.map((c) => (
          <Card
            key={c.id}
            title={`${c.nome} (ID: ${c.id})`}
            actions={
              <>
                <button className="btn view" onClick={() => abrirItens(c)}>Ver itens</button>
                <button className="btn primary" onClick={() => setModalEditar(c)}>Editar</button>
                <button className="btn danger" onClick={() => excluir(c.id)}>Excluir</button>
              </>
            }
          />
        ))}
      </div>

      {/* MODAL ITENS */}
      {modalItens && (
        <div className="modal-bg" onClick={() => setModalItens(null)}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <h2>{modalItens.categoria.nome}</h2>

            <input
              placeholder="Buscar produto pelo nome..."
              value={buscaProdutoModal}
              onChange={(e) => setBuscaProdutoModal(e.target.value)}
            />

            <div className="modal-content-scroll">
              {modalItens.itens
                .filter(p =>
                  p.nome.toLowerCase().includes(buscaProdutoModal.toLowerCase())
                )
                .map(p => (
                  <p key={p.id}>{p.nome} — R$ {p.preco} (ID: {p.id})</p>
                ))}
            </div>

            <button className="btn primary" onClick={() => setModalItens(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {modalEditar && (
        <div className="modal-bg" onClick={() => setModalEditar(null)}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <h2>Editar Categoria</h2>

            <input
              value={modalEditar.nome}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, nome: e.target.value })
              }
            />

            <button className="btn primary" onClick={salvarEdicao}>
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
