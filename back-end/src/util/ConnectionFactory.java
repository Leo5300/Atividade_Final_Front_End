package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

    private static final String URL = "jdbc:mysql://localhost:3306/aulajdbc";
    private static final String USER = "root";
    private static final String PASS = "123456";
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";

    static {
        try {
            Class.forName(DRIVER);
            System.out.println("Driver JDBC carregado com sucesso.");
        } catch (ClassNotFoundException e) {
            System.err.println("Driver JDBC não encontrado.");
            throw new RuntimeException(e);
        }
    }

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASS);
        } catch (SQLException e) {
            System.err.println("Erro ao conectar ao banco. Verifique MySQL, URL ou credenciais.");
            throw new RuntimeException(e);
        }
    }
}
