import { dbConnect } from '../../data/db.js'

class entradaProdDbModules {
	async createEntradaProd(
		nome,
		lote,
		dataValidade,
		funcionario,
		precoCusto,
		quantidade,
		unidade
	) {
		try {
			const dataEntrada = new Date()
			const entradaProd = await dbConnect('entradaProd')
				.insert({
					nome,
					lote,
					dataValidade,
					dataEntrada,
					funcionario,
					precoCusto,
					quantidade,
					unidade,
				})
				.returning([
					'id',
					'nome',
					'lote',
					'dataValidade',
					'dataEntrada',
					'funcionario',
					'precoCusto',
					'quantidade',
					'unidade',
				])
			return entradaProd
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in createEntradaProd')
		}
	}

	async getEntradaProdutoById(id) {
		try {
			const entradaProduto = dbConnect('entradaProd')
				.where('id', id)
				.first()
			return entradaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getEntradaProdutoById')
		}
	}

	async updateEntradaProduto(id, nome, lote, dataValidade) {
		try {
			const date = new Date()
			const updatedEntradaProduto = await dbConnect('entradaProd')
				.where('id', id)
				.update(
					{
						nome: nome,
						lote: lote,
						dataValidade: dataValidade,
						updated_at: date,
					},
					[
						'id',
						'nome',
						'lote',
						'dataValidade',
						'dataEntrada',
						'created_at',
						'updated_at',
					]
				)
			return updatedEntradaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateEntradaProduto')
		}
	}

	async getEntradaProdutos() {
		try {
			const entradaprodutos = await dbConnect('entradaProd')
				.select()
				.table('entradaProd')
			return entradaprodutos
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getEntradaProdutos')
		}
	}
}

export { entradaProdDbModules }
