# Projeto Laravel com React

Este projeto é uma aplicação web que combina Laravel no backend e React no frontend. Ele gerencia informações sobre clientes, cidades e responsáveis.

## Funcionalidades

- **Gerenciamento de Clientes**: Adicionar, editar, excluir e visualizar clientes.
- **Gerenciamento de Cidades**: Listar e gerenciar cidades.
- **Gerenciamento de Responsáveis**: Associar responsáveis às cidades e visualizá-los.

---

## Páginas 

- / : Redirecionado para clientes
- /clientes : Gerencie os clientes
- /cidades : Gerencie as cidades
- /responsaveis : Gerencie os responsáveis 

---

## Endpoints API

### 1. **Clientes (Clients)**

- `GET /api/clients`: Retorna todos os clientes.
- `POST /api/clients`: Cria um novo cliente.
- `GET /api/clients/{id}`: Retorna um cliente específico.
- `PUT /api/clients/{id}`: Atualiza um cliente.
- `DELETE /api/clients/{id}`: Exclui um cliente.

### 2. **Cidades (Cities)**

- `GET /api/cities`: Retorna todas as cidades.
- `POST /api/cities`: Cria uma nova cidade.
- `GET /api/cities/{id}`: Retorna uma cidade específica.
- `PUT /api/cities/{id}`: Atualiza uma cidade.
- `DELETE /api/cities/{id}`: Exclui uma cidade.

### 3. **Responsáveis (Responsibles)**

- `GET /api/responsibles`: Retorna todos os responsáveis.
- `POST /api/responsibles`: Cria um novo responsável.
- `GET /api/responsibles/{id}`: Retorna um responsável específico.
- `PUT /api/responsibles/{id}`: Atualiza um responsável.
- `DELETE /api/responsibles/{id}`: Exclui um responsável.

---

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- PHP 8.x
- Composer
- Node.js e npm
- MySQL com um banco de dados criado chamado:  
  **`client_control`**

---

## Como Rodar

1. **Configurar o backend (Laravel)**:
   - Instale as dependências:  
     `composer install`
   - Configure o ambiente:  
     Copie `.env.example` para `.env` e ajuste as configurações de banco de dados.
   - Execute as migrations para criar as tabelas no banco de dados:  
     `php artisan migrate`
   - Popule o banco de dados:  
     `php artisan db:seed`

2. **Configurar o frontend (React)**:
   - Instale as dependências:  
     `npm install`

3. **Rode o projeto**
     `composer run dev`
   - Acesse `http://127.0.0.1:8000`
    
---

