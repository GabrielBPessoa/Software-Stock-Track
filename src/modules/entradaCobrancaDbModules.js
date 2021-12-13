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

	async getCobrancaByDateRange(startDate, endDate) {
		try {
			const parseStartDate = new Date(startDate)
			const firstDate = new Date(parseStartDate)
			firstDate.setUTCHours(0, 0, 0)

			const parseFinalDate = new Date(endDate)
			const Finaldate = new Date(parseFinalDate)
			Finaldate.setUTCHours(23, 59, 59)

			const itens = await dbConnect('entradaCobranca')
				.where('created_at', '>=', firstDate)
				.where('created_at', '<=', Finaldate)
				.orderBy('created_at')
			return itens
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaByDateRange')
		}
	}
	async approveCobranca(id) {
		try {
			const cobranca = await dbConnect('entradaCobranca')
				.where('id', id)
				.update({ status: 'PAGO' })
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}

	async rejectCobranca(id) {
		try {
			const cobranca = await dbConnect('entradaCobranca')
				.where('id', id)
				.update({ status: 'CANCELADO' })
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}
}

export { EntradaCobrancaDbModules }
