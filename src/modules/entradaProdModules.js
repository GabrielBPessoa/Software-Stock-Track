import { dbConnect } from '../../data/db.js'

class entradaProdDbModules {
	async createEntradaProd(
		nome,
		lote,
		dataValidade,
		funcionario,
		precoCusto,
		quantidade,
		unidade,
		nomeFornecedor,
		cnpjFornecedor,
		enderecoFornecedor,
		telefoneFornecedor,
		dataFabricacao,
		descricaoProduto
	) {
		try {
			const dataEntrada = new Date()
			const total = precoCusto * quantidade
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
					total,
					nomeFornecedor,
					cnpjFornecedor,
					enderecoFornecedor,
					telefoneFornecedor,
					dataFabricacao,
					descricaoProduto,
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
					'total',
					'nomeFornecedor',
					'cnpjFornecedor',
					'enderecoFornecedor',
					'telefoneFornecedor',
					'dataFabricacao',
					'descricaoProduto',
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
	async getEntradaProdutoByLote(lote) {
		try {
			const entradaProduto = dbConnect('entradaProd')
				.where('lote', lote)
				.first()
			return entradaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getEntradaProdutoByLote')
		}
	}

	async updateEntradaProduto(
		id,
		nome,
		lote,
		dataValidade,
		precoCusto,
		quantidade,
		unidade,
		nomeFornecedor,
		cnpjFornecedor,
		enderecoFornecedor,
		telefoneFornecedor
	) {
		try {
			const date = new Date()
			const updatedEntradaProduto = await dbConnect('entradaProd')
				.where('id', id)
				.update(
					{
						nome: nome,
						lote: lote,
						dataValidade: dataValidade,
						precoCusto: precoCusto,
						quantidade: quantidade,
						unidade: unidade,
						updated_at: date,
						nomeFornecedor: nomeFornecedor,
						cnpjFornecedor: cnpjFornecedor,
						enderecoFornecedor: enderecoFornecedor,
						telefoneFornecedor: telefoneFornecedor,
					},
					[
						'id',
						'nome',
						'lote',
						'dataValidade',
						'dataEntrada',
						'funcionario',
						'precoCusto',
						'quantidade',
						'unidade',
						'total',
						'nomeFornecedor',
						'cnpjFornecedor',
						'enderecoFornecedor',
						'telefoneFornecedor',
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

	async getEntradaProdutoByName(name) {
		try {
			const entradaProduto = dbConnect('entradaProd').where('nome', name)
			return entradaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getEntradaProdutoByNome')
		}
	}

	async getProdutoByDateRange(startDate, endDate) {
		try {
			const parseStartDate = new Date(startDate)
			const firstDate = new Date(parseStartDate)
			firstDate.setUTCHours(0, 0, 0)

			const parseFinalDate = new Date(endDate)
			const Finaldate = new Date(parseFinalDate)
			Finaldate.setUTCHours(23, 59, 59)

			const itens = await dbConnect('entradaProd')
				.where('created_at', '>=', firstDate)
				.where('created_at', '<=', Finaldate)
				.orderBy('created_at')
			return itens
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getProdutoByDateRange')
		}
	}
}

export { entradaProdDbModules }
