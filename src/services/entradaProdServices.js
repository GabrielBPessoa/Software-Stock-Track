import { entradaProdDbModules } from '../modules/entradaProdModules.js'
import { ProdutosDbModules } from '../modules/produtosDbModules.js'
import { CommonModules } from '../common/commonModules.js'

class entradaProdService {
	async createEntradaProd(entradaProdData) {
		try {
			const commomModules = new CommonModules()
			const produtosDbModules = new ProdutosDbModules()
			const {
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
				descricaoProduto,
			} = entradaProdData
			const isExpirationDateValid = await commomModules.validateDate(
				dataValidade
			)
			if (!isExpirationDateValid) {
				return false
			}
			const parsedDataValidade =
				commomModules.parseDateString(dataValidade)

			const parsedDataFabricacao =
				commomModules.parseDateString(dataFabricacao)
			const EntradaProd = new entradaProdDbModules()
			const createdentradaProd = await EntradaProd.createEntradaProd(
				nome.toLowerCase(),
				lote,
				parsedDataValidade,
				funcionario,
				precoCusto,
				quantidade,
				unidade,
				nomeFornecedor,
				cnpjFornecedor,
				enderecoFornecedor,
				telefoneFornecedor,
				parsedDataFabricacao,
				descricaoProduto
			)
			const produtoExists = await produtosDbModules.checkProdutoByNome(
				nome.toLowerCase()
			)
			if (produtoExists === undefined) {
				const descricao = 'Descrição Padrão'
				const margemLucro = '30'
				const status = 'ativo'
				await produtosDbModules.createProduto(
					nome.toLowerCase(),
					descricao,
					precoCusto,
					margemLucro,
					quantidade,
					unidade,
					status
				)
				// } else {
				// 	const updatedQuantidade =
				// 		produtoExists.quantidade + parseInt(quantidade)
				// 	await produtosDbModules.updateQuantidadeProduto(
				// 		produtoExists.id,
				// 		updatedQuantidade,
				// 		unidade
				// 	)
			}
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
			const commomModules = new CommonModules()
			// const isExpirationDateValid = await commomModules.validateDate(
			// 	info.dataValidade
			// )
			// if (!isExpirationDateValid) {
			// 	return false
			// }
			// const parsedDataValidade = commomModules.parseDateString(
			// 	info.dataValidade
			// )
			const updatedEntradaProduto =
				await entradaProdutoDbModules.updateEntradaProduto(
					id,
					info.nome.toLowerCase(),
					info.lote,
					info.dataValidade,
					info.precoCusto,
					info.quantidade,
					info.unidade,
					info.nomeFornecedor,
					info.cnpjFornecedor,
					info.enderecoFornecedor,
					info.telefoneFornecedor
				)
			return updatedEntradaProduto
		} catch (err) {
			console.log(err.message)
			throw new Error(
				'Something went wrong in updateEntradaProdutoService'
			)
		}
	}

	async getProdutoByDateRange(startDate, endDate) {
		try {
			const entradaProdutoDbModules = new entradaProdDbModules()
			const Produto = await entradaProdutoDbModules.getProdutoByDateRange(
				startDate,
				endDate
			)
			return Produto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}
}

export { entradaProdService }
