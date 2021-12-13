import { dbConnect } from '../../data/db.js'

class SaidaProdDbModules {
	async createSaidaProd(
		nome,
		lote,
		funcionario,
		precoVenda,
		quantidade,
		nomeCliente,
		cnpjCliente,
		endereçoCliente,
		telefoneCliente,
		dataFabricacao,
		dataValidade,
		descricaoProduto,
		unidade
	) {
		try {
			const dataSaida = new Date()
			const total = precoVenda * quantidade
			const saidaProd = await dbConnect('saidaProd')
				.insert({
					nome,
					lote,
					dataSaida,
					funcionario,
					precoVenda,
					quantidade,
					total,
					nomeCliente,
					cnpjCliente,
					endereçoCliente,
					telefoneCliente,
					dataFabricacao,
					dataValidade,
					descricaoProduto,
					unidade,
				})
				.returning([
					'id',
					'nome',
					'lote',
					'dataSaida',
					'funcionario',
					'precoVenda',
					'quantidade',
					'total',
					'nomeCliente',
					'cnpjCliente',
					'endereçoCliente',
					'telefoneCliente',
					'dataFabricacao',
					'dataValidade',
					'descricaoProduto',
					'unidade',
				])
			return saidaProd
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in createSaidaProd')
		}
	}

	async getSaidaProdutoById(id) {
		try {
			const saidaProduto = dbConnect('saidaProd').where('id', id).first()
			return saidaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getSaidaProdutoById')
		}
	}

	async updateSaidaProduto(id, nome, lote, precoVenda, quantidade) {
		try {
			const date = new Date()
			const updatedSaidaProduto = await dbConnect('saidaProd')
				.where('id', id)
				.update(
					{
						nome: nome,
						lote: lote,
						precoVenda: precoVenda,
						quantidade: quantidade,
						updated_at: date,
					},
					[
						'id',
						'nome',
						'precoVenda',
						'quantidade',
						'dataSaida',
						'created_at',
						'updated_at',
					]
				)
			return updatedSaidaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateSaidaProduto')
		}
	}

	async getSaidaProdutos() {
		try {
			const saidaprodutos = await dbConnect('saidaProd')
				.select()
				.table('saidaProd')
			return saidaprodutos
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getSaidaProdutos')
		}
	}
	async getSaidasByLote(lote) {
		try {
			const saidaProduto = dbConnect('saidaProd').where('lote', lote)
			return saidaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getSaidasByLote')
		}
	}

	async getSaidasByName(Name) {
		try {
			const saidaProduto = dbConnect('saidaProd').where('nome', Name)
			return saidaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getSaidasByName')
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

			const itens = await dbConnect('saidaProd')
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

export { SaidaProdDbModules }
