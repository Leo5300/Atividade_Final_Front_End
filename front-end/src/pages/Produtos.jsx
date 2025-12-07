import { useEffect, useState } from "react";
import {
    getProdutos,
    getCategorias,
    createProduto,
    deleteProduto
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
        categoria: ""
    });

    const [loadingDelete, setLoadingDelete] = useState(null); // ID do item removendo

    async function load() {
        const listaProdutos = await getProdutos();
        const listaCategorias = await getCategorias();

        setProdutos(listaProdutos.filter(p => p.id !== undefined && p.id !== null));
        setCategorias(listaCategorias);
    }

    useEffect(() => { load(); }, []);

    async function enviar(e) {
        e.preventDefault();

        await createProduto({
            nome: form.nome,
            preco: Number(form.preco),
            estoque: Number(form.estoque),
            categoria: form.categoria ? { id: Number(form.categoria) } : null
        });

        load();
    }

    async function excluir(id) {
        if (!id || isNaN(id)) return alert("ID inválido.");

        // 🔥 UI OTIMISTA — remove imediatamente
        const anterior = [...produtos];
        setLoadingDelete(id);
        setProdutos(produtos.filter(p => p.id !== id));

        try {
            await deleteProduto(id);
        } catch (error) {
            alert("Erro ao excluir: " + error.message);

            // ❌ desfaz, caso o backend falhe
            setProdutos(anterior);
        }

        setLoadingDelete(null);
    }

    return (
        <div className="page">
            <div className="glass">
                <h2>Novo Produto</h2>

                <form className="form" onSubmit={enviar}>
                    <input
                        placeholder="Nome"
                        onChange={e => setForm({...form, nome: e.target.value})}
                    />
                    <input
                        placeholder="Preço"
                        type="number"
                        onChange={e => setForm({...form, preco: e.target.value})}
                    />
                    <input
                        placeholder="Estoque"
                        type="number"
                        onChange={e => setForm({...form, estoque: e.target.value})}
                    />

                    <select onChange={e => setForm({...form, categoria: e.target.value})}>
                        <option value="">Sem categoria</option>
                        {categorias.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.nome}
                            </option>
                        ))}
                    </select>

                    <button className="btn primary">Salvar</button>
                </form>
            </div>

            <div className="grid">
                {produtos.map(p => (
                    <Card
                        key={p.id}
                        title={p.nome}
                        actions={
                            <button
                                className="btn danger"
                                onClick={() => excluir(p.id)}
                                disabled={loadingDelete === p.id}
                                style={{
                                    opacity: loadingDelete === p.id ? 0.5 : 1,
                                    pointerEvents: loadingDelete === p.id ? "none" : "auto"
                                }}
                            >
                                {loadingDelete === p.id ? "Removendo..." : "Excluir"}
                            </button>
                        }
                    >
                        Preço: R$ {p.preco}<br/>
                        Estoque: {p.estoque}<br/>
                        Categoria: {p.categoria?.nome || "Nenhuma"}
                    </Card>
                ))}
            </div>
        </div>
    );
}
