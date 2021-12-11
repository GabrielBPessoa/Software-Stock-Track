import { SaidaCobrancaDbModules } from '../modules/saidaCobrancaDbModules.js'

class SaidaCobrancaService {
	async createSaidaCobranca(data) {
		try {
			const {
				numeroPedido,
				valor,
				nomeDevedor,
				cnpjDevedor,
				enderecoDevedor,
				telefoneDevedor,
			} = data
			const cobrancaDbModules = new SaidaCobrancaDbModules()
			const createSaida = await cobrancaDbModules.createCobranca(
				numeroPedido,
				valor,
				nomeDevedor.toLowerCase(),
				cnpjDevedor,
				enderecoDevedor,
				telefoneDevedor
			)
			return createSaida
		} catch (err) {
			console.log(err.message)
			throw new Error('something went wrong in createSaidaCobranca')
		}
	}

	async getAllCobrancas() {
		try {
			const cobrancaDbModules = new SaidaCobrancaDbModules()
			const cobrancas = await cobrancaDbModules.getCobrancas()
			let total = 0
			for (let i = 0; i < cobrancas.length; i++) {
				if (cobrancas[i].status === 'PENDENTE') {
					total += cobrancas[i].valor
				}
			}
			cobrancas.push({ total })
			return cobrancas
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getAllCobrancas')
		}
	}

	async getCobrancaById(id) {
		try {
			const cobrancaDbModules = new SaidaCobrancaDbModules()
			const cobranca = await cobrancaDbModules.getCobrancaById(id)
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaById')
		}
	}

	async getCobrancaByPedido(numeroPedido) {
		try {
			const cobrancaDbModules = new SaidaCobrancaDbModules()
			const cobranca = await cobrancaDbModules.getCobrancaByPedido(
				numeroPedido
			)
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaById')
		}
	}

	async getCobrancaByDateRange(startDate, endDate) {
		try {
			const cobrancaDbModules = new SaidaCobrancaDbModules()
			const cobranca = await cobrancaDbModules.getCobrancaByDateRange(
				startDate,
				endDate
			)
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaById')
		}
	}

	async updateCobranca(id, info) {
		try {
			const cobrancaDbModules = new SaidaCobrancaDbModules()
			const updatedCobranca = await cobrancaDbModules.updateCobranca(
				id,
				info.numeroPedido,
				info.valor,
				info.nomeDevedor.toLowerCase(),
				info.cnpjDevedor,
				info.enderecoDevedor,
				info.telefoneDevedor
			)
			return updatedCobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateCobranca')
		}
	}

	async approveCobranca(id) {
		try {
			const cobrancaDbModules = new SaidaCobrancaDbModules()
			const cobranca = await cobrancaDbModules.approveCobranca(id)

			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}

	async rejectCobranca(id) {
		try {
			const cobrancaDbModules = new SaidaCobrancaDbModules()
			const cobranca = await cobrancaDbModules.rejectCobranca(id)

			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}
}

export { SaidaCobrancaService }
