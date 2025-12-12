package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import model.Categoria;
import model.Produto;
import util.ConnectionFactory;

public class ProdutoDAO {

    public List<Produto> buscarTodos() {
        List<Produto> produtos = new ArrayList<>();

        String sql = """
            SELECT p.*, c.id AS id_categoria, c.nome AS nome_categoria
            FROM produtos p
            LEFT JOIN categorias c ON p.id_categoria = c.id
        """;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Categoria categoria = null;

                if (rs.getLong("id_categoria") != 0) {
                    categoria = new Categoria(
                            rs.getLong("id_categoria"),
                            rs.getString("nome_categoria"));
                }

                produtos.add(new Produto(
                        rs.getLong("id"),
                        rs.getString("nome"),
                        rs.getDouble("preco"),
                        rs.getInt("estoque"),
                        categoria));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return produtos;
    }

    public Produto buscarPorId(Long id) {
        Produto produto = null;

        String sql = """
            SELECT p.*, c.id AS id_categoria, c.nome AS nome_categoria
            FROM produtos p
            LEFT JOIN categorias c ON p.id_categoria = c.id
            WHERE p.id = ?
        """;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Categoria categoria = null;

                if (rs.getLong("id_categoria") != 0) {
                    categoria = new Categoria(
                            rs.getLong("id_categoria"),
                            rs.getString("nome_categoria"));
                }

                produto = new Produto(
                        rs.getLong("id"),
                        rs.getString("nome"),
                        rs.getDouble("preco"),
                        rs.getInt("estoque"),
                        categoria);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return produto;
    }

    public List<Produto> buscarPorNome(String nome) {
        List<Produto> lista = new ArrayList<>();

        String sql = """
            SELECT p.*, c.id AS id_categoria, c.nome AS nome_categoria
            FROM produtos p
            LEFT JOIN categorias c ON p.id_categoria = c.id
            WHERE p.nome LIKE ?
        """;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, "%" + nome + "%");
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Categoria categoria = null;

                if (rs.getLong("id_categoria") != 0) {
                    categoria = new Categoria(
                            rs.getLong("id_categoria"),
                            rs.getString("nome_categoria"));
                }

                lista.add(new Produto(
                        rs.getLong("id"),
                        rs.getString("nome"),
                        rs.getDouble("preco"),
                        rs.getInt("estoque"),
                        categoria));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public void inserir(Produto produto) {
        String sql = "INSERT INTO produtos (nome, preco, estoque, id_categoria) VALUES (?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getPreco());
            stmt.setInt(3, produto.getEstoque());

            if (produto.getCategoria() != null) {
                stmt.setLong(4, produto.getCategoria().getId());
            } else {
                stmt.setNull(4, Types.BIGINT);
            }

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(Produto produto) {
        String sql = "UPDATE produtos SET nome=?, preco=?, estoque=?, id_categoria=? WHERE id=?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getPreco());
            stmt.setInt(3, produto.getEstoque());

            if (produto.getCategoria() != null) {
                stmt.setLong(4, produto.getCategoria().getId());
            } else {
                stmt.setNull(4, Types.BIGINT);
            }

            stmt.setLong(5, produto.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(Long id) {
        String sql = "DELETE FROM produtos WHERE id=?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
