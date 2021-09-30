exports.up = function (knex) {
	return knex.schema.createTable('entradaProd', (table) => {
		table.increments('id')
		table.string('nome', 255).notNullable()
		table.string('lote', 255).notNullable()
		table.string('funcionario', 255).notNullable()
		table.date('dataValidade', 255).notNullable()
		table.date('dataEntrada', 255).notNullable()
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('entradaProd')
}
