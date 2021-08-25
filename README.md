# TCC Impacta

## Stack:

- [nodeJS](https://nodejs.org/en/) - `v14.16.1`
- [expressJS](https://expressjs.com/)

## Setup

- `npm install`

## Comandos para execução

- `docker-compose up --build -d`
- `npm run dev`

## Migrations

- Criar uma nova migration:
- `knex migrate:make {NOME DA MIGRATION} --migrations-directory data/migrations`
- Atualizar as migrations:
- `npm run migrate`
- Fazer downgrade das migrations:
- `npm run migrateDown`
