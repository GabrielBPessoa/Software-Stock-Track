import { dbConnect } from '../../data/db.js'

class FornecedorDbModules {
	async createFornecedor(nome, cnpj, endereco, telefone) {
		try {
			const fornecedor = await dbConnect('fornecedor')
				.insert({
					nome,
					cnpj,
					endereco,
					telefone,
				})
				.returning(['id', 'nome', 'cnpj', 'endereco', 'telefone'])
			return fornecedor
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in createFornecedor')
		}
	}

	async getFornecedorById(id) {
		try {
			const fornecedor = dbConnect('fornecedor').where('id', id).first()
			return fornecedor
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getFornecedorById')
		}
	}
	async getFornecedorByCnpj(cnpj) {
		try {
			const fornecedor = dbConnect('fornecedor')
				.where('cnpj', cnpj)
				.first()
			return fornecedor
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getFornecedorByCnpj')
		}
	}

	async updateFornecedor(id, nome, cnpj, endereco, telefone) {
		try {
			const date = new Date()
			const updatedFornecedor = await dbConnect('fornecedor')
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
			return updatedFornecedor
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateFornecedor')
		}
	}

	async getFornecedores() {
		try {
			const fornecedores = await dbConnect('fornecedor')
				.select()
				.table('fornecedor')
			return fornecedores
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getFornecedores')
		}
	}
}

export { FornecedorDbModules }
