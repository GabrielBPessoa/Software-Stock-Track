exports.up = function (knex) {
	return knex.schema.createTable('produtos', (table) => {
		table.increments('id')
		table.string('nome').notNullable().unique()
		table.string('descricao').notNullable().defaultTo('Descrição Padrão')
		table.float('precoCusto', 2).notNullable()
		table.float('margemLucro', 2).notNullable().defaultTo(30)
		table.integer('quantidade').notNullable().defaultTo(0)
		table.string('unidade').notNullable().defaultTo('Unidade Padrão')
		table.string('status').notNullable().defaultTo('ativo')

		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('produtos')
}
