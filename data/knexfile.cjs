module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST || 'localhost',
			port: process.env.DB_PORT || 5433,
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASSWORD || 'postgres',
			database: process.env.DATABASE || 'postgres',
		},
		migrations: {
			directory: './migrations',
		},
		seeds: { directory: '/data/seeds' },
	},

	testing: {
		client: 'pg',
		connection: process.env.DB_URL,
		migrations: {
			directory: './data/migrations',
		},
		seeds: { directory: './data/seeds' },
	},

	production: {
		client: 'pg',
		connection: process.env.DB_URL,
		migrations: {
			directory: './data/migrations',
		},
		seeds: { directory: './data/seeds' },
	},
}
