package api;

import static spark.Spark.*;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Filter;
import dao.CategoriaDAO;
import dao.ProdutoDAO;
import model.Categoria;
import model.Produto;

import com.google.gson.Gson;

public class ApiProduto {

    // instancia do DAO e o GSON
    private static final ProdutoDAO produtoDAO = new ProdutoDAO();
    private static final CategoriaDAO categoriaDAO = new CategoriaDAO();
    private static final Gson gson = new Gson();

    // constante para garantir que todas as respostas sejam JSON
    private static final String APPLICATION_JSON = "application/json";

    public static void main(String[] args) {

        // configuração do Servidor
        port(4567); // Define a porta da API. Acesso via http://localhost:4567

        // ============================
        // CORS
        // ============================

        options("/*", (request, response) -> {

            String reqHeaders = request.headers("Access-Control-Request-Headers");
            if (reqHeaders != null) {
                response.header("Access-Control-Allow-Headers", reqHeaders);
            }

            String reqMethod = request.headers("Access-Control-Request-Method");
            if (reqMethod != null) {
                response.header("Access-Control-Allow-Methods", reqMethod);
            }

            return "OK";
        });

        before((req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type");
        });

        // ============================
        // Rotas
        // ============================

        // GET /produtos - Buscar todos
        get("/produtos", (request, response) -> gson.toJson(produtoDAO.buscarTodos()));

        // GET /produtos/:id - Buscar por ID
        get("/produtos/:id", (request, response) -> {
            try {
                Long id = Long.parseLong(request.params(":id"));
                Produto produto = produtoDAO.buscarPorId(id);
                if (produto != null) {
                    return gson.toJson(produto);
                } else {
                    response.status(404);
                    return "{\"mensagem\": \"Produto com ID " + id + " não encontrado\"}";
                }
            } catch (NumberFormatException e) {
                response.status(400);
                return "{\"mensagem\": \"Formato de ID inválido.\"}";
            }
        });

        // POST /produtos - Criar novo produto
        post("/produtos", (request, response) -> {
            try {
                Produto novoProduto = gson.fromJson(request.body(), Produto.class);
                produtoDAO.inserir(novoProduto);
                response.status(201);
                return gson.toJson(novoProduto);
            } catch (Exception e) {
                response.status(500);
                return "{\"mensagem\": \"Erro ao criar produto.\"}";
            }
        });

        // PUT /produtos/:id - Atualizar produto existente
        put("/produtos/:id", (request, response) -> {
            try {
                Long id = Long.parseLong(request.params(":id"));
                if (produtoDAO.buscarPorId(id) == null) {
                    response.status(404);
                    return "{\"mensagem\": \"Produto não encontrado para atualização.\"}";
                }
                Produto produtoParaAtualizar = gson.fromJson(request.body(), Produto.class);
                produtoParaAtualizar.setId(id);
                produtoDAO.atualizar(produtoParaAtualizar);
                response.status(200);
                return gson.toJson(produtoParaAtualizar);
            } catch (Exception e) {
                response.status(500);
                return "{\"mensagem\": \"Erro ao atualizar produto.\"}";
            }
        });

        // DELETE /produtos/:id - Deletar um produto
        delete("/produtos/:id", (request, response) -> {
            try {
                Long id = Long.parseLong(request.params(":id"));
                if (produtoDAO.buscarPorId(id) == null) {
                    response.status(404);
                    return "{\"mensagem\": \"Produto não encontrado para exclusão.\"}";
                }
                produtoDAO.deletar(id);
                response.status(204);
                return "";
            } catch (Exception e) {
                response.status(400);
                return "{\"mensagem\": \"Formato de ID inválido.\"}";
            }
        });

        // GET /categorias - Buscar todos
        get("/categorias", (request, response) -> gson.toJson(categoriaDAO.buscarTodos()));

        // GET /categorias/:id
        get("/categorias/:id", (request, response) -> {
            try {
                Long id = Long.parseLong(request.params(":id"));
                Categoria categoria = categoriaDAO.buscarPorId(id);
                if (categoria != null) {
                    return gson.toJson(categoria);
                } else {
                    response.status(404);
                    return "{\"mensagem\": \"Categoria com ID " + id + " não encontrado\"}";
                }
            } catch (Exception e) {
                response.status(400);
                return "{\"mensagem\": \"Formato de ID inválido.\"}";
            }
        });

        // POST /categorias
        post("/categorias", (request, response) -> {
            try {
                Categoria novaCategoria = gson.fromJson(request.body(), Categoria.class);
                categoriaDAO.inserir(novaCategoria);
                response.status(201);
                return gson.toJson(novaCategoria);
            } catch (Exception e) {
                response.status(500);
                return "{\"mensagem\": \"Erro ao criar categoria.\"}";
            }
        });

        // PUT /categorias/:id
        put("/categorias/:id", (request, response) -> {
            try {
                Long id = Long.parseLong(request.params(":id"));
                if (categoriaDAO.buscarPorId(id) == null) {
                    response.status(404);
                    return "{\"mensagem\": \"Categoria não encontrada para atualização.\"}";
                }
                Categoria categoriaParaAtualizar = gson.fromJson(request.body(), Categoria.class);
                categoriaParaAtualizar.setId(id);
                categoriaDAO.atualizar(categoriaParaAtualizar);
                response.status(200);
                return gson.toJson(categoriaParaAtualizar);
            } catch (Exception e) {
                response.status(500);
                return "{\"mensagem\": \"Erro ao atualizar categoria.\"}";
            }
        });

        // DELETE /categorias/:id
        delete("/categorias/:id", (request, response) -> {
            try {
                Long id = Long.parseLong(request.params(":id"));
                if (categoriaDAO.buscarPorId(id) == null) {
                    response.status(404);
                    return "{\"mensagem\": \"Categoria não encontrada para exclusão.\"}";
                }
                categoriaDAO.deletar(id);
                response.status(204);
                return "";
            } catch (Exception e) {
                response.status(500);
                return "{\"mensagem\": \"Erro ao deletar categoria.\"}";
            }
        });

        System.out.println("API de Produtos iniciada na porta 4567.");
    }
}
