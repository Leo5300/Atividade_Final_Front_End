
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

#  2. Estrutura do Repositório e acesso

O repositório está organizado da seguinte forma:

back-end/ – código completo do servidor Java
front-end/ – código completo da aplicação React
README - guia de execução

Passo 1: Clonar o repositório: git clone https://github.com/SEU_USUARIO/Atividade_Final_Front_End.git

Passo 2: Acessar a pasta principal do projeto: cd Atividade_Final_Front_End

Passo 3: Acessar a pasta do Front-End:cd front-end

Passo 4: Voltar para a pasta raiz: cd ..

Passo 5: Acessar a pasta do Back-End: cd back-end

---

#  3. Banco de Dados (MySQL)

O script SQL utilizado no projeto está localizado em:
back-end/aulajdbc.sql

Esse script é responsável por:

Criar o banco de dados aulajdbc
Criar as tabelas categorias e produtos
Definir o relacionamento entre as tabelas

O script também inclui dados iniciais para facilitar o primeiro teste da aplicação:

• Categoria inicial: Eletrônicos (ID 1)
• Produto inicial: Celular Samsung Galaxy S25 Ultra 5G (ID 1), vinculado à categoria Eletrônicos

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

📁 Categorias

GET /categorias
Retorna a lista completa de categorias cadastradas.

GET /categorias/{id}
Retorna uma categoria específica com base no ID informado.

GET /categorias/nome/{nome}
Retorna uma ou mais categorias cujo nome corresponda ao valor informado (busca textual).

POST /categorias
Cria uma nova categoria no sistema.

PUT /categorias/{id}
Atualiza os dados de uma categoria existente.

DELETE /categorias/{id}
Remove uma categoria.
Caso existam produtos associados, eles permanecem no sistema, porém ficam sem categoria, conforme a regra ON DELETE SET NULL definida no banco de dados.

📦 Produtos

GET /produtos
Retorna a lista completa de produtos cadastrados.

GET /produtos/{id}
Retorna um produto específico com base no ID informado.

GET /produtos/nome/{nome}
Retorna uma lista de produtos cujo nome corresponda ao valor informado (busca textual).

POST /produtos
Cria um novo produto, podendo ou não estar associado a uma categoria.

PUT /produtos/{id}
Atualiza os dados de um produto existente.

DELETE /produtos/{id}
Remove um produto do sistema.

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

 ---

# 8. Considerações Finais

Este projeto demonstra, de forma prática, a integração entre Front-End e Back-End, reforçando conceitos de APIs REST, arquitetura cliente-servidor e persistência de dados em banco relacional, atendendo integralmente aos requisitos propostos na atividade.

