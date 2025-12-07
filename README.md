
# ATIVIDADE FINAL – Integração Desenvolvimento Front-End & Back-End

## READme – Guia de Execução do Projeto

Aluno: Leonardo Marchi Malheiros
Matrícula: 25174070

Este guia explica de forma direta como executar o Back-End e o Front-End do projeto, além de apresentar a estrutura do repositório e exemplos dos endpoints utilizados na integração.

---

#  1. Visão Geral do Projeto

O projeto integra um Back-End em Java (Spark + JDBC + MySQL) com um Front-End em ReactJS.
Toda a comunicação entre as camadas é feita usando Fetch API, conforme solicitado na atividade.

Foram implementados CRUDs completos para Categorias e Produtos, incluindo:
• GET – listagem geral e busca por ID
• POST – criação de dados
• PUT – atualização
• DELETE – remoção

O objetivo é demonstrar a comunicação entre Front-End e Back-End com total funcionalidade.

---

#  2. Estrutura do Repositório

O repositório está organizado da seguinte forma:

app_frontProdutos
BackEnd – código completo do servidor Java
FrontEnd – código completo da aplicação React
READme.pdf – versão em PDF do guia de execução

---

#  3. Banco de Dados (MySQL)

O script SQL utilizado está em BackEnd/aulajdbc.sql.
Ele é responsável por criar o banco aulajdbc, as tabelas categorias e produtos e definir o relacionamento entre elas.

O script inclui dados iniciais apenas para facilitar o primeiro teste:
• Categoria inicial: Eletrônicos (ID 1)
• Produto inicial: Celular Samsung Galaxy S25 Ultra 5G (ID 1), vinculado à categoria Eletrônicos

Esses dados podem ser alterados livremente pela aplicação.

---

#  4. Como Executar o Back-End

Pré-requisitos:
• Java JDK 17 ou superior
• MySQL instalado e em execução
• Porta 4567 disponível

Passo 1: Importar o banco
Execute o arquivo aulajdbc.sql no MySQL Workbench, DBeaver ou terminal MySQL.
Isso criará o banco, tabelas e registros iniciais.

Passo 2: Configurar credenciais
O arquivo BackEnd/src/util/ConnectionFactory.java contém:
URL do banco, usuário e senha.
Altere se necessário.

Passo 3: Executar o servidor
Execute o projeto pela IDE ou pelo terminal dentro da pasta BackEnd.
Ao iniciar corretamente, aparecerá no console que a API está ativa e que o driver JDBC foi carregado.

A API ficará disponível em:
[http://localhost:4567](http://localhost:4567)

---

#  5. Como Executar o Front-End (ReactJS)

Pré-requisitos:
• Node.js instalado
• npm instalado

Passo 1: Instalar dependências
Dentro da pasta FrontEnd execute o comando npm install.

Passo 2: Iniciar o projeto
Execute npm start.

A aplicação abrirá automaticamente em:
[http://localhost:3000](http://localhost:3000)

---

#  6. Endpoints REST – Exemplos

Segue uma visão geral dos endpoints consumidos pelo Front-End.
Os exemplos servem apenas como referência da estrutura utilizada.

Categorias:
GET /categorias – retorna todas as categorias
GET /categorias/{id} – retorna categoria específica
POST /categorias – cria nova categoria
PUT /categorias/{id} – atualiza categoria
DELETE /categorias/{id} – exclui categoria (produtos associados ficam sem categoria devido ao ON DELETE SET NULL)

Produtos:
GET /produtos – retorna todos os produtos
GET /produtos/{id} – retorna produto específico
POST /produtos – cria novo produto
PUT /produtos/{id} – atualiza produto
DELETE /produtos/{id} – remove produto

---

#  7. Fluxo Sugerido para Teste

1. Subir o Back-End e confirmar que a API está respondendo.
2. Verificar no MySQL se o banco e os dados iniciais foram criados.
3. Subir o Front-End com npm start.
4. Testar o CRUD completo de Categorias.
5. Testar o CRUD completo de Produtos.
6. Testar a busca por ID para ambos.
7. Confirmar comportamento da exclusão de categorias (produtos ficam sem categoria).
8. Validar a integração total entre as camadas.



