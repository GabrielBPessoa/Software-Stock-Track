exports.up = function (knex) {
	return knex.schema.createTable('saidaCobranca', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
		table.string('numeroPedido', 255).notNullable()
		table.float('valor', 255).notNullable()
		table.string('nomeDevedor', 255).notNullable()
		table.string('cnpjDevedor', 255).notNullable()
		table.string('enderecoDevedor', 255).notNullable()
		table.string('telefoneDevedor', 255).notNullable()
		table.date('vencimento', 255).notNullable()
		table.string('status', 255).defaultTo('PENDENTE')
		table.timestamps(true, true)
	})
}
exports.down = function (knex) {
	return knex.schema.dropTable('saidaCobranca')
}
