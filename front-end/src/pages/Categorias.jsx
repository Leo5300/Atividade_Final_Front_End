import { useEffect, useState } from "react";
import {
  getCategorias,
  getProdutos,
  createCategoria,
  deleteCategoria,
  updateCategoria,
  getCategoriaById,
} from "../api/Api";

import Card from "../components/Card";
import "../styles/layout.css";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");

  const [modalItens, setModalItens] = useState(null);
  const [modalEditar, setModalEditar] = useState(null);

  // BUSCA POR ID
  const [buscaId, setBuscaId] = useState("");
  const [resultadoId, setResultadoId] = useState(null);
  const [msgBusca, setMsgBusca] = useState("");

  const [removendo, setRemovendo] = useState(false);

  async function load() {
    setCategorias(await getCategorias());
    setProdutos(await getProdutos());
  }

  useEffect(() => {
    load();
  }, []);

  async function salvarCategoria(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    await createCategoria({ nome });
    setNome("");
    load();
  }

  async function buscarPorId(e) {
    e.preventDefault();
    setResultadoId(null);

    if (!buscaId.trim()) {
      setMsgBusca("Informe um ID");
      return;
    }

    const cat = await getCategoriaById(buscaId);
    if (!cat) {
      setMsgBusca("Categoria não encontrada");
      return;
    }

    setRemovendo(false);
    setResultadoId(cat);
    setMsgBusca("");
  }

  function abrirItens(c) {
    const itens = produtos.filter((p) => p.categoria?.id === c.id);
    setModalItens({ categoria: c, itens });
  }

  async function excluir(id) {
    if (resultadoId && resultadoId.id === id) {
      setRemovendo(true);

      setTimeout(async () => {
        setResultadoId(null);
        await deleteCategoria(id);
        setModalItens(null);
        load();
      }, 350);

      return;
    }

    await deleteCategoria(id);
    setModalItens(null);
    load();
  }

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

      {/* Criar categoria */}
      <div className="glass">
        <h2>Nova Categoria</h2>

        <form className="form" onSubmit={salvarCategoria}>
          <input
            placeholder="Nome da categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button className="btn primary">Salvar</button>
        </form>
      </div>

      {/* Buscar por ID */}
      <div className="glass" style={{ marginTop: 20 }}>
        <h2>Buscar Categoria por ID</h2>

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
                  <button className="btn view" onClick={() => abrirItens(resultadoId)}>
                    Ver itens
                  </button>
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
            />
          </div>
        )}
      </div>

      {/* Lista geral */}
      <div className="grid">
        {categorias.map((c) => (
          <Card
            key={c.id}
            title={`${c.nome} (ID: ${c.id})`}
            actions={
              <>
                <button className="btn view" onClick={() => abrirItens(c)}>
                  Ver itens
                </button>
                <button className="btn primary" onClick={() => setModalEditar(c)}>
                  Editar
                </button>
                <button className="btn danger" onClick={() => excluir(c.id)}>
                  Excluir
                </button>
              </>
            }
          />
        ))}
      </div>

      {/* Modal itens */}
      {modalItens && (
        <div className="modal-bg" onClick={() => setModalItens(null)}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <h2>{modalItens.categoria.nome}</h2>

            {modalItens.itens.length === 0 && <p>Nenhum produto.</p>}

            {modalItens.itens.map((p) => (
              <p key={p.id}>
                {p.nome} — R${p.preco} (ID: {p.id})
              </p>
            ))}

            <button className="btn primary" onClick={() => setModalItens(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal editar */}
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
