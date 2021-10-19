import { SaidaProdDbModules } from '../modules/saidaProdutoModules.js'
import { entradaProdDbModules } from '../modules/entradaProdModules.js'

class SaidaProdService {
	async createSaidaProd(data) {
		try {
			const { nome, lote, funcionario, precoVenda, quantidade } = data
			const saidaProduto = new SaidaProdDbModules()
			const createSaida = await saidaProduto.createSaidaProd(
				nome.toLowerCase(),
				lote,
				funcionario,
				precoVenda,
				quantidade
			)
			return createSaida
		} catch (err) {
			console.log(err.message)
			throw new Error('something went wrong in createSaidaProdService')
		}
	}

	async getAllSaidas() {
		try {
			const saidaProduto = new SaidaProdDbModules()
			const saidaProdutos = await saidaProduto.getSaidaProdutos()
			return saidaProdutos
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getAllSaidas')
		}
	}

	async getSaidaById(id) {
		try {
			const saidaProduto = new SaidaProdDbModules()
			const saida = await saidaProduto.getSaidaProdutoById(id)
			return saida
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getSaidaByIdService')
		}
	}

	async updateSaida(id, info) {
		try {
			const saidaProduto = new SaidaProdDbModules()
			const updatedSaida = await saidaProduto.updateSaidaProduto(
				id,
				info.nome.toLowerCase(),
				info.precoVenda,
				info.quantidade
			)
			return updatedSaida
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateSaidaService')
		}
	}
	async getMetrics(lote) {
		const entradaDbModules = new entradaProdDbModules()
		const saidaProduto = new SaidaProdDbModules()

		const saidas = await saidaProduto.getSaidasByLote(lote)

		let quantidadeSaida = 0

		for (let i = 0; i < saidas.length; i++) {
			quantidadeSaida += saidas[i].quantidade
		}

		return quantidadeSaida
	}
}

export { SaidaProdService }
