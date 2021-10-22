exports.up = function (knex) {
	return knex.schema.createTable('saidaProd', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
		table.string('nome', 255).notNullable()
		table.string('lote', 255).notNullable()
		table.string('funcionario', 255).notNullable()
		table.float('precoVenda', 255).notNullable()
		table.date('dataSaida', 255).notNullable()
		table.integer('quantidade').notNullable()
		table.float('total', 255).notNullable()
		table.string('nomeCliente', 255).notNullable()
		table.string('cnpjCliente', 255).notNullable()
		table.string('endereçoCliente', 255).notNullable()
		table.string('telefoneCliente', 255).notNullable()
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('saidaProd')
}
