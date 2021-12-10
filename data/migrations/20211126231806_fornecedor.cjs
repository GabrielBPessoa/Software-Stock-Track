exports.up = function (knex) {
	return knex.schema.createTable('fornecedor', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
		table.string('nome', 255).notNullable()
		table.string('cnpj', 255).notNullable()
		table.string('endereco', 255).notNullable()
		table.string('telefone', 255).notNullable()
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('fornecedor')
}
