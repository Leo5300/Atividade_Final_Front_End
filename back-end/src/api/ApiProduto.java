package api;

import static spark.Spark.*;

import dao.CategoriaDAO;
import dao.ProdutoDAO;
import model.Categoria;
import model.Produto;

import com.google.gson.Gson;

public class ApiProduto {

    private static final ProdutoDAO produtoDAO = new ProdutoDAO();
    private static final CategoriaDAO categoriaDAO = new CategoriaDAO();
    private static final Gson gson = new Gson();

    private static final String APPLICATION_JSON = "application/json";

    public static void main(String[] args) {

        // ============================
        // CONFIGURAÇÃO DO SERVIDOR
        // ============================
        port(4567);

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
            res.type(APPLICATION_JSON);
        });

        // ============================
        // PRODUTOS
        // ============================

        // BUSCAR POR NOME (SEMPRE PRIMEIRO)
        get("/produtos/nome/:nome", (req, res) -> {
            return gson.toJson(
                produtoDAO.buscarPorNome(req.params(":nome"))
            );
        });

        // BUSCAR TODOS
        get("/produtos", (req, res) -> {
            return gson.toJson(produtoDAO.buscarTodos());
        });

        // BUSCAR POR ID
        get("/produtos/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));
                Produto produto = produtoDAO.buscarPorId(id);

                if (produto == null) {
                    res.status(404);
                    return "{\"mensagem\":\"Produto não encontrado\"}";
                }

                return gson.toJson(produto);

            } catch (NumberFormatException e) {
                res.status(400);
                return "{\"mensagem\":\"ID inválido\"}";
            }
        });

        // CRIAR PRODUTO
        post("/produtos", (req, res) -> {
            try {
                Produto produto = gson.fromJson(req.body(), Produto.class);
                produtoDAO.inserir(produto);
                res.status(201);
                return gson.toJson(produto);
            } catch (Exception e) {
                res.status(500);
                return "{\"mensagem\":\"Erro ao criar produto\"}";
            }
        });

        // ATUALIZAR PRODUTO
        put("/produtos/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));

                if (produtoDAO.buscarPorId(id) == null) {
                    res.status(404);
                    return "{\"mensagem\":\"Produto não encontrado\"}";
                }

                Produto produto = gson.fromJson(req.body(), Produto.class);
                produto.setId(id);
                produtoDAO.atualizar(produto);

                return gson.toJson(produto);

            } catch (Exception e) {
                res.status(500);
                return "{\"mensagem\":\"Erro ao atualizar produto\"}";
            }
        });

        // DELETAR PRODUTO
        delete("/produtos/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));

                if (produtoDAO.buscarPorId(id) == null) {
                    res.status(404);
                    return "{\"mensagem\":\"Produto não encontrado\"}";
                }

                produtoDAO.deletar(id);
                res.status(204);
                return "";

            } catch (Exception e) {
                res.status(400);
                return "{\"mensagem\":\"ID inválido\"}";
            }
        });

        // ============================
        // CATEGORIAS
        // ============================

        // BUSCAR POR NOME (PRIMEIRO)
        get("/categorias/nome/:nome", (req, res) -> {
            return gson.toJson(
                categoriaDAO.buscarPorNome(req.params(":nome"))
            );
        });

        // BUSCAR TODAS
        get("/categorias", (req, res) -> {
            return gson.toJson(categoriaDAO.buscarTodos());
        });

        // BUSCAR POR ID
        get("/categorias/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));
                Categoria categoria = categoriaDAO.buscarPorId(id);

                if (categoria == null) {
                    res.status(404);
                    return "{\"mensagem\":\"Categoria não encontrada\"}";
                }

                return gson.toJson(categoria);

            } catch (NumberFormatException e) {
                res.status(400);
                return "{\"mensagem\":\"ID inválido\"}";
            }
        });

        // CRIAR CATEGORIA
        post("/categorias", (req, res) -> {
            try {
                Categoria categoria = gson.fromJson(req.body(), Categoria.class);
                categoriaDAO.inserir(categoria);
                res.status(201);
                return gson.toJson(categoria);
            } catch (Exception e) {
                res.status(500);
                return "{\"mensagem\":\"Erro ao criar categoria\"}";
            }
        });

        // ATUALIZAR CATEGORIA
        put("/categorias/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));

                if (categoriaDAO.buscarPorId(id) == null) {
                    res.status(404);
                    return "{\"mensagem\":\"Categoria não encontrada\"}";
                }

                Categoria categoria = gson.fromJson(req.body(), Categoria.class);
                categoria.setId(id);
                categoriaDAO.atualizar(categoria);

                return gson.toJson(categoria);

            } catch (Exception e) {
                res.status(500);
                return "{\"mensagem\":\"Erro ao atualizar categoria\"}";
            }
        });

        // DELETAR CATEGORIA
        delete("/categorias/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));

                if (categoriaDAO.buscarPorId(id) == null) {
                    res.status(404);
                    return "{\"mensagem\":\"Categoria não encontrada\"}";
                }

                categoriaDAO.deletar(id);
                res.status(204);
                return "";

            } catch (Exception e) {
                res.status(500);
                return "{\"mensagem\":\"Erro ao deletar categoria\"}";
            }
        });

        System.out.println("API iniciada em http://localhost:4567");
    }
}
