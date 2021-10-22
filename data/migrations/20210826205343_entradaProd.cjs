exports.up = function (knex) {
	return knex.schema.createTable('entradaProd', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
		table.string('nome', 255).notNullable()
		table.string('lote', 255).notNullable()
		table.string('funcionario', 255).notNullable()
		table.float('precoCusto', 2).notNullable()
		table.date('dataValidade', 255).notNullable()
		table.date('dataEntrada', 255).notNullable()
		table.integer('quantidade').notNullable()
		table.string('unidade').notNullable()
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('entradaProd')
}
