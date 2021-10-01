import { ProdutosDbModules } from '../modules/produtosDbModules.js'

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
			const produtos = await produtoDbModules.getProdutos()
			return produtos
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getProdutosService')
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
				info.nome,
				info.descricao,
				info.validade
			)
			return updatedProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateProdutoService')
		}
	}
}

export { ProdutosService }
