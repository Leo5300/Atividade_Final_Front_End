// Base URL da API
const BASE_URL = "http://localhost:4567";

/**
 * Função auxiliar para tratar a resposta do fetch.
 * Verifica se a resposta foi bem-sucedida (response.ok) e
 * tenta extrair o JSON ou lança um erro com a mensagem do servidor.
 */
const handleResponse = async (response) => {
  // Se o status da resposta for 200-299, retorna a resposta
  if (response.ok) {
    // 204 No Content (como o DELETE) não possui corpo JSON, retorna true
    if (response.status === 204) return true;
    
    // Se a resposta estiver OK (200, 201), tenta ler o JSON
    return response.json();
  } 
  
  // Se o status for de erro (4xx ou 5xx)
  let errorData;
  try {
    // Tenta ler o corpo como JSON (onde a API Spark retorna a mensagem de erro)
    errorData = await response.json();
  } catch (e) {
    // Se não for JSON (ex: erro de servidor simples), lê como texto
    errorData = await response.text();
  }
  
  // Lança um erro com a mensagem do servidor e o status
  const errorMessage = errorData.mensagem || errorData || `Erro ${response.status}: Falha na requisição.`;
  throw new Error(errorMessage);
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
  const response = await fetch(`${BASE_URL}/produtos/${id}`, { method: "DELETE" });
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
  const response = await fetch(`${BASE_URL}/categorias/${id}`, { method: "DELETE" });
  return handleResponse(response);
};