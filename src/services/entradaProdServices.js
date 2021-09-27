import { entradaProdDbModules } from '../modules/entradaProdModules.js'
import { CommonModules } from '../common/commonModules.js'

class entradaProdService {
	async createEntradaProd(entradaProdData) {
		try {
			const commomModules = new CommonModules()
			const { nome, lote, dataValidade } = entradaProdData
			const isExpirationDateValid = await commomModules.validateDate(
				dataValidade
			)
			if (!isExpirationDateValid) {
				return false
			}
			const parsedDataValidade =
				commomModules.parseDateString(dataValidade)
			const EntradaProd = new entradaProdDbModules()
			const createdentradaProd = await EntradaProd.createEntradaProd(
				nome,
				lote,
				parsedDataValidade
			)
			return createdentradaProd
		} catch (err) {
			console.log(err.message)
			throw new Error('something went wrong in createEntradaProdService')
		}
	}

	async getentradaProdutos() {
		try {
			const entradaprodutoDbModules = new entradaProdDbModules()
			const entradaprodutos =
				await entradaprodutoDbModules.getEntradaProdutos()
			return entradaprodutos
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getentradaProdutosService')
		}
	}

	async getEntradaProdutoById(id) {
		try {
			const entradaProdutoDbModules = new entradaProdDbModules()
			const entradaProduto =
				await entradaProdutoDbModules.getEntradaProdutoById(id)
			return entradaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error(
				'Something went wrong in getEntradaProdutoByIdService'
			)
		}
	}

	async updateEntradaProduto(id, info) {
		try {
			const entradaProdutoDbModules = new entradaProdDbModules()
			const updatedEntradaProduto =
				await entradaProdutoDbModules.updateEntradaProduto(
					id,
					info.nome,
					info.lote,
					info.dataValidade
				)
			return updatedEntradaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error(
				'Something went wrong in updateEntradaProdutoService'
			)
		}
	}
}

export { entradaProdService }
