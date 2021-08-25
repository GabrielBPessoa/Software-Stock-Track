exports.up = function (knex) {
	return knex.schema.createTable('user', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
		table.string('firstName', 255).notNullable()
		table.string('lastName', 255).notNullable()
		table.string('email', 255).notNullable()
		table.string('password', 255).notNullable()
		table.string('cpf', 255).notNullable()
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('user')
}
