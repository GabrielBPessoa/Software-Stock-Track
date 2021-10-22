exports.up = function (knex) {
	return knex.schema.createTable('entradaCobranca', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
		table.uuid('numeroPedido', 255).references('id').inTable('entradaProd')
		table.float('total', 255).notNullable()
		table.string('nomeFornecedor', 255).notNullable()
		table.string('cnpjFornecedor', 255).notNullable()
		table.string('endereçoFornecedor', 255).notNullable()
		table.string('telefoneFornecedor', 255).notNullable()
		table.date('vencimento', 255).notNullable()
		table.string('status', 255).defaultTo('PENDENTE')
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('entradaCobranca')
}
