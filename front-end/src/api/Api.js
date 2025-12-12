// ============================
// BASE DA API
// ============================
const BASE_URL = "http://localhost:4567";

// ============================
// TRATAMENTO PADRÃO DE RESPOSTA
// (corrige o erro "Body has already been consumed")
// ============================
const handleResponse = async (response) => {
  if (response.ok) {
    if (response.status === 204) return true; // DELETE não retorna body
    return response.json();
  }

  // Lê o corpo UMA ÚNICA VEZ
  const text = await response.text();

  try {
    const json = JSON.parse(text);
    throw new Error(json.mensagem || "Erro na requisição");
  } catch {
    throw new Error(text || `Erro ${response.status}`);
  }
};

// ============================
// PRODUTOS
// ============================

// GET - todos os produtos
export const getProdutos = async () => {
  const response = await fetch(`${BASE_URL}/produtos`);
  return handleResponse(response);
};

// GET - produto por ID
export const getProdutoById = async (id) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`);
  return handleResponse(response);
};

// GET - produto por nome
export const getProdutosByNome = async (nome) => {
  const response = await fetch(
    `${BASE_URL}/produtos/nome/${encodeURIComponent(nome)}`
  );
  return handleResponse(response);
};

// POST - criar produto
export const createProduto = async (produto) => {
  const response = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  return handleResponse(response);
};

// PUT - atualizar produto
export const updateProduto = async (id, produto) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  return handleResponse(response);
};

// DELETE - remover produto
export const deleteProduto = async (id) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

// ============================
// CATEGORIAS
// ============================

// GET - todas as categorias
export const getCategorias = async () => {
  const response = await fetch(`${BASE_URL}/categorias`);
  return handleResponse(response);
};

// GET - categoria por ID
export const getCategoriaById = async (id) => {
  const response = await fetch(`${BASE_URL}/categorias/${id}`);
  return handleResponse(response);
};

// GET - categoria por nome
export const getCategoriasByNome = async (nome) => {
  const response = await fetch(
    `${BASE_URL}/categorias/nome/${encodeURIComponent(nome)}`
  );
  return handleResponse(response);
};

// POST - criar categoria
export const createCategoria = async (categoria) => {
  const response = await fetch(`${BASE_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  return handleResponse(response);
};

// PUT - atualizar categoria
export const updateCategoria = async (id, categoria) => {
  const response = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  return handleResponse(response);
};

// DELETE - remover categoria
export const deleteCategoria = async (id) => {
  const response = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
