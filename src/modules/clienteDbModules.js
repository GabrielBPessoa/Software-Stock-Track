import { dbConnect } from '../../data/db.js'

class ClienteDbModules {
	async createCliente(nome, cnpj, endereco, telefone) {
		try {
			const cliente = await dbConnect('cliente')
				.insert({
					nome,
					cnpj,
					endereco,
					telefone,
				})
				.returning(['id', 'nome', 'cnpj', 'endereco', 'telefone'])
			return cliente
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in createCliente')
		}
	}

	async getClienteById(id) {
		try {
			const cliente = dbConnect('cliente').where('id', id).first()
			return cliente
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getClienteById')
		}
	}
	async getClienteByCnpj(cnpj) {
		try {
			const cliente = dbConnect('cliente').where('cnpj', cnpj).first()
			return cliente
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getClienteBycnpj')
		}
	}

	async updateCliente(id, nome, cnpj, endereco, telefone) {
		try {
			const date = new Date()
			const updatedCliente = await dbConnect('cliente')
				.where('id', id)
				.update(
					{
						nome: nome,
						cnpj: cnpj,
						endereco: endereco,
						telefone: telefone,
						updated_at: date,
					},
					[
						'id',
						'nome',
						'cnpj',
						'endereco',
						'telefone',
						'created_at',
						'updated_at',
					]
				)
			return updatedCliente
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateCliente')
		}
	}

	async getClientes() {
		try {
			const clientes = await dbConnect('cliente')
				.select()
				.table('cliente')
			return clientes
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getClientes')
		}
	}
}

export { ClienteDbModules }
