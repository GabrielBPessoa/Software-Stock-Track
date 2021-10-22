import { EntradaCobrancaDbModules } from '../modules/entradaCobrancaDbModules.js'

class EntradaCobrancaService {
	async createSaidaCobranca(data) {
		try {
			const {
				numeroPedido,
				valor,
				nomeFornecedor,
				cnpjFornecedor,
				enderecoFornecedor,
				telefoneFornecedor,
			} = data
			const cobrancaDbModules = new EntradaCobrancaDbModules()
			const createSaida = await cobrancaDbModules.createCobranca(
				numeroPedido,
				valor,
				nomeFornecedor.toLowerCase(),
				cnpjFornecedor,
				enderecoFornecedor,
				telefoneFornecedor
			)
			return createSaida
		} catch (err) {
			console.log(err.message)
			throw new Error('something went wrong in createSaidaCobranca')
		}
	}

	async getAllCobrancas() {
		try {
			const cobrancaDbModules = new EntradaCobrancaDbModules()
			const cobrancas = await cobrancaDbModules.getCobrancas()
			return cobrancas
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getAllCobrancas')
		}
	}

	async getCobrancaById(id) {
		try {
			const cobrancaDbModules = new EntradaCobrancaDbModules()
			const cobranca = await cobrancaDbModules.getCobrancaById(id)
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaById')
		}
	}

	async updateCobranca(id, info) {
		try {
			const cobrancaDbModules = new EntradaCobrancaDbModules()
			const updatedCobranca = await cobrancaDbModules.updateCobranca(
				id,
				info.numeroPedido,
				info.valor,
				info.nomeFornecedor.toLowerCase(),
				info.cnpjFornecedor,
				info.enderecoFornecedor,
				info.telefoneFornecedor
			)
			return updatedCobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateCobranca')
		}
	}
	async getCobrancasByDate(dataInicio, dataFinal) {
		try {
			const cobrancaDbModules = new EntradaCobrancaDbModules()
			const cobranca = await cobrancaDbModules.getCobrancasByDate(dataInicio, dataFinal)
			return cobranca
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getCobrancaByDate')
		}
	}
}

export { EntradaCobrancaService }
