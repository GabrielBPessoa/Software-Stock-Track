import { dbConnect } from '../../data/db.js'

class EntradaCobrancaDbModules {
	async createCobranca(
		numeroPedido,
		valor,
		nomeFornecedor,
		cnpjFornecedor,
		enderecoFornecedor,
		telefoneFornecedor
	) {
		try {
			const vencimento = new Date()
			vencimento.setDate(vencimento.getDate() + 30)
			const cobranca = await dbConnect('entradaCobranca')
				.insert({
					numeroPedido,
					valor,
					nomeFornecedor,
					cnpjFornecedor,
					enderecoFornecedor,
					telefoneFornecedor,
					vencimento,
				})
				.returning([
					'id',
					'numeroPedido',
					'valor',
					'nomeFornecedor',
					'cnpjFornecedor',
					'enderecoFornecedor',
					'telefoneFornecedor',
					'vencimento',
					'status',
				])
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in createCobranca')
		}
	}

	async getCobrancaById(id) {
		try {
			const cobranca = dbConnect('entradaCobranca')
				.where('id', id)
				.first()
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaById')
		}
	}

	async updateCobranca(
		id,
		numeroPedido,
		valor,
		nomeFornecedor,
		cnpjFornecedor,
		endereçoFornecedor,
		telefoneFornecedor,
		status
	) {
		try {
			const vencimento = new Date()
			vencimento.setDate(vencimento.getDate() + 30)
			const cobranca = await dbConnect('entradaCobranca')
				.where('id', id)
				.update(
					{
						numeroPedido: numeroPedido,
						valor: valor,
						nomeFornecedor: nomeFornecedor,
						cnpjFornecedor: cnpjFornecedor,
						endereçoFornecedor: endereçoFornecedor,
						telefoneFornecedor: telefoneFornecedor,
						vencimento: vencimento,
						status: status,
						updated_at: date,
					},
					[
						'id',
						'numeroPedido',
						'nomeFornecedor',
						'cnpjFornecedor',
						'endereçoFornecedor',
						'telefoneFornecedor',
						'vencimento',
						'created_at',
						'updated_at',
					]
				)
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateCobranca')
		}
	}

	async getCobrancas() {
		try {
			const cobrancas = await dbConnect('entradaCobranca')
				.select()
				.table('entradaCobranca')
			return cobrancas
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobranca')
		}
	}
	async getCobrancasByDate(dataInicio, dataFinal) {
		try {
			const cobrancas = await dbConnect('entradaCobranca')
				.table('entradaCobranca').where('created_at', '>=', dataInicio).where('created_at', '<=', dataFinal)
			return cobrancas
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaByDate')
		}
	}
}

export { EntradaCobrancaDbModules }
