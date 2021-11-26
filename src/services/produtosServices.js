import { ProdutosDbModules } from '../modules/produtosDbModules.js'
import { entradaProdDbModules } from '../modules/entradaProdModules.js'
import { SaidaProdDbModules } from '../modules/saidaProdutoModules.js'

class ProdutosService {
	async createProduto(produtoData) {
		try {
			const { nome, descricao, precoCusto } = produtoData
			const produtoDbModules = new ProdutosDbModules()
			const produtoExists = await produtoDbModules.checkProdutoByNome(
				nome.toLowerCase()
			)
			if (produtoExists === undefined) {
				const createdProduto = await produtoDbModules.createProduto(
					nome.toLowerCase(),
					descricao,
					precoCusto
				)
				return createdProduto
			} else {
				return {
					data: 'Produto já cadastrado',
				}
			}
		} catch (err) {
			console.log(err.message)
			throw new Error('something went wrong in createProdutoService')
		}
	}

	async getProdutos() {
		try {
			const produtoDbModules = new ProdutosDbModules()
			const entradaProdutos = new entradaProdDbModules()
			const saidaProdutos = new SaidaProdDbModules()

			const produtos = await produtoDbModules.getProdutos()

			const inventory = []

			for (let i = 0; i < produtos.length; i++) {
				let quantidadeEntrada = 0
				let quantidadeSaida = 0

				const entradaInfo =
					await entradaProdutos.getEntradaProdutoByName(
						produtos[i].nome
					)

				if (entradaInfo.length === 0) {
					produtos[i].dataValidade = null
				} else {
					const filteredInfo = entradaInfo.filter((dates) => {
						if (dates.dataValidade >= new Date()) {
							return dates
						}
					})

					if (filteredInfo.length === 0) {
						const nearestDate = entradaInfo.reduce(function (
							element,
							Previousitem
						) {
							return element.dataValidade >=
								Previousitem.dataValidade
								? element
								: Previousitem
						})

						produtos[i].dataValidade =
							nearestDate.dataValidade.toLocaleDateString()
					} else {
						const nearestDate = filteredInfo.reduce(function (
							element,
							Previousitem
						) {
							return element.dataValidade <
								Previousitem.dataValidade
								? element
								: Previousitem
						})

						produtos[i].dataValidade =
							nearestDate.dataValidade.toLocaleDateString()
					}
				}

				const saidaInfo = await saidaProdutos.getSaidasByName(
					produtos[i].nome
				)

				if (saidaInfo.length !== 0) {
					const ultimaVenda = saidaInfo.reduce(function (
						element,
						Previousitem
					) {
						return element.dataSaida >= Previousitem.dataSaida
							? element
							: Previousitem
					})

					produtos[i].ultimaVenda =
						ultimaVenda.dataSaida.toLocaleDateString()
				} else {
					produtos[i].ultimaVenda = null
				}

				for (let j = 0; j < entradaInfo.length; j++) {
					quantidadeEntrada += entradaInfo[j].quantidade
				}

				for (let n = 0; n < saidaInfo.length; n++) {
					quantidadeSaida += saidaInfo[n].quantidade
				}

				const quantidade = quantidadeEntrada - quantidadeSaida

				produtos[i].quantidade = quantidade

				inventory.push(produtos[i])
			}
			return inventory
		} catch (err) {
			console.log(err.message)
		}
	}

	async getProdutoById(id) {
		try {
			const produtoDbModules = new ProdutosDbModules()
			const produto = await produtoDbModules.getProdutoById(id)
			return produto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getProdutoByIdService')
		}
	}

	async updateProduto(id, info) {
		try {
			const produtoDbModules = new ProdutosDbModules()
			const updatedProduto = await produtoDbModules.updateProduto(
				id,
				info.nome.toLowerCase(),
				info.descricao,
				info.precoCusto,
				info.margemLucro
			)
			return updatedProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateProdutoService')
		}
	}
}

export { ProdutosService }
