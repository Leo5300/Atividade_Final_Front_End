// Base URL da API
const BASE_URL = "http://localhost:4567";

/**
 * Função auxiliar para tratar a resposta do fetch.
 * Verifica se a resposta foi bem-sucedida (response.ok) e
 * tenta extrair o JSON ou lança um erro com a mensagem do servidor.
 */
const handleResponse = async (response) => {
  if (response.ok) {
    if (response.status === 204) return true; // DELETE não tem body
    return response.json();
  }

  let errorData;
  try {
    errorData = await response.json();
  } catch {
    errorData = await response.text();
  }

  const message =
    errorData.mensagem ||
    errorData ||
    `Erro ${response.status}: Falha na requisição.`;

  throw new Error(message);
};

// ============================
// PRODUTOS
// ============================

export const getProdutos = async () => {
  const response = await fetch(`${BASE_URL}/produtos`);
  return handleResponse(response);
};

export const getProdutoById = async (id) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`);
  return handleResponse(response);
};

export const createProduto = async (produto) => {
  const response = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  return handleResponse(response);
};

export const updateProduto = async (id, produto) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  return handleResponse(response);
};

export const deleteProduto = async (id) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

// ============================
// CATEGORIAS
// ============================

export const getCategorias = async () => {
  const response = await fetch(`${BASE_URL}/categorias`);
  return handleResponse(response);
};

export const getCategoriaById = async (id) => {
  const response = await fetch(`${BASE_URL}/categorias/${id}`);
  return handleResponse(response);
};

export const createCategoria = async (categoria) => {
  const response = await fetch(`${BASE_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  return handleResponse(response);
};

export const updateCategoria = async (id, categoria) => {
  const response = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  return handleResponse(response);
};

export const deleteCategoria = async (id) => {
  const response = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
