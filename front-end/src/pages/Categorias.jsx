import { useEffect, useState } from "react";
import {
    getCategorias,
    getProdutos,
    createCategoria,
    deleteCategoria
} from "../api/Api";

import Card from "../components/Card";
import "../styles/layout.css";

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState("");

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [itens, setItens] = useState([]);

    // ============================
    // LOAD GERAL
    // ============================
    async function load() {
        const listaCategorias = await getCategorias();
        const listaProdutos = await getProdutos();

        setCategorias(listaCategorias);
        setProdutos(listaProdutos);
    }

    useEffect(() => {
        load();
    }, []);

    // ============================
    // CADASTRAR
    // ============================
    async function enviar(e) {
        e.preventDefault();
        if (!nome.trim()) return;

        await createCategoria({ nome });
        setNome("");
        await load();
    }

    // ============================
    // ABRIR MODAL DA CATEGORIA
    // ============================
    function abrirModal(categoria) {
        const filtrados = produtos.filter(
            (p) => p.categoria?.id === categoria.id
        );

        setCategoriaSelecionada(categoria);
        setItens(filtrados);
        setModalOpen(true);
    }

    // ============================
    // EXCLUIR CATEGORIA
    // ============================
    async function excluir(id) {
        setModalOpen(false);
        await deleteCategoria(id);
        await load();
    }

    return (
        <div className="page">

            {/* FORM CADASTRO */}
            <div className="glass">
                <h2>Nova Categoria</h2>

                <form className="form" onSubmit={enviar}>
                    <input
                        placeholder="Nome da categoria"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <button className="btn primary">Salvar</button>
                </form>
            </div>

            {/* GRID DE CATEGORIAS */}
            <div className="grid">
                {categorias.map((c) => (
                    <Card
                        key={c.id}
                        title={c.nome}
                        actions={
                            <>
                                <button className="btn view" onClick={() => abrirModal(c)}>
                                    Ver itens
                                </button>

                                <button
                                    className="btn danger"
                                    onClick={() => excluir(c.id)}
                                >
                                    Excluir
                                </button>
                            </>
                        }
                    />
                ))}
            </div>

            {/* ============================
                MODAL GLASS 
             ============================ */}
            {modalOpen && (
                <div className="modal-bg" onClick={() => setModalOpen(false)}>

                    <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
                        <h2>{categoriaSelecionada?.nome}</h2>

                        {/* LISTA DOS PRODUTOS */}
                        {itens.length === 0 && (
                            <p style={{ opacity: 0.7 }}>Nenhum produto nesta categoria.</p>
                        )}

                        {itens.map((p) => (
                            <div className="item" key={p.id}>
                                <strong>{p.nome}</strong>
                                <span>R$ {p.preco} | Estoque: {p.estoque}</span>
                            </div>
                        ))}

                        <button
                            className="btn primary"
                            style={{ marginTop: "20px" }}
                            onClick={() => setModalOpen(false)}
                        >
                            Fechar
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
