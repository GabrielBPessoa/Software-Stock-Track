exports.up = function (knex) {
	return knex.schema.createTable('produtos', (table) => {
		table.increments('id')
		table.string('nome').notNullable()
		table.string('descricao').notNullable()
		table.date('validade').notNullable()
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('produtos')
}
