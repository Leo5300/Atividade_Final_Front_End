-- ---------------------------------------------------------
-- BANCO DE DADOS: aulajdbc
-- Autor: Leonardo
-- Descrição: Estrutura + Dados Iniciais
-- ---------------------------------------------------------

-- Criar o banco (caso não exista)
CREATE DATABASE IF NOT EXISTS aulajdbc;
USE aulajdbc;

-- ---------------------------------------------------------
-- TABELA: categorias
-- ---------------------------------------------------------
DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

-- Dados iniciais
INSERT INTO categorias (id, nome) VALUES
(1, 'Eletrônicos');

-- ---------------------------------------------------------
-- TABELA: produtos
-- ---------------------------------------------------------
DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DOUBLE NOT NULL,
    estoque INT NOT NULL,
    id_categoria BIGINT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Produto inicial
INSERT INTO produtos (id, nome, preco, estoque, id_categoria) VALUES
(1, 'Celular Samsung Galaxy S25 Ultra 5G, 256GB', 5999.00, 1, 1);
