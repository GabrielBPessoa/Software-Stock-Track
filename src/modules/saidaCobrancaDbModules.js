import { dbConnect } from '../../data/db.js'

class SaidaCobrancaDbModules {
	async createCobranca(
		numeroPedido,
		valor,
		nomeDevedor,
		cnpjDevedor,
		enderecoDevedor,
		telefoneDevedor
	) {
		try {
			const vencimento = new Date()
			vencimento.setDate(vencimento.getDate() + 30)
			const cobranca = await dbConnect('saidaCobranca')
				.insert({
					numeroPedido,
					valor,
					nomeDevedor,
					cnpjDevedor,
					enderecoDevedor,
					telefoneDevedor,
					vencimento,
				})
				.returning([
					'id',
					'numeroPedido',
					'valor',
					'nomeDevedor',
					'cnpjDevedor',
					'enderecoDevedor',
					'telefoneDevedor',
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
			const cobranca = dbConnect('saidaCobranca').where('id', id).first()
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
		nomeDevedor,
		cnpjDevedor,
		endereçoDevedor,
		telefoneDevedor,
		status
	) {
		try {
			const vencimento = new Date()
			vencimento.setDate(vencimento.getDate() + 30)
			const cobranca = await dbConnect('saidaCobranca')
				.where('id', id)
				.update(
					{
						numeroPedido: numeroPedido,
						valor: valor,
						nomeDevedor: nomeDevedor,
						cnpjDevedor: cnpjDevedor,
						endereçoDevedor: endereçoDevedor,
						telefoneDevedor: telefoneDevedor,
						vencimento: vencimento,
						status: status,
						updated_at: date,
					},
					[
						'id',
						'numeroPedido',
						'nomeDevedor',
						'cnpjDevedor',
						'endereçoDevedor',
						'telefoneDevedor',
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
			const cobrancas = await dbConnect('saidaCobranca')
				.select()
				.table('saidaCobranca')
			return cobrancas
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobranca')
		}
	}

	async getCobrancaByDateRange(startDate, endDate) {
		try {
			const itens = await dbConnect('saidaCobranca')
				.where('created_at', '>=', startDate)
				.where('created_at', '<=', endDate)
				.orderBy('created_at')
			return itens
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaByDateRange')
		}
	}
}

export { SaidaCobrancaDbModules }
