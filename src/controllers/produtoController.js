import { ProdutosService } from '../services/produtosServices.js'

class ProdutoController {
	async createProduto(req, res, next) {
		try {
			const produtoService = new ProdutosService()
			const createdProdutos = await produtoService.createProduto(req.body)
			if (createdProdutos.data) {
				return res.status(400).json(createdProdutos)
			}
			return res.status(201).json(createdProdutos)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async getAllProdutos(req, res, next) {
		try {
			const produtoService = new ProdutosService()
			const produtos = await produtoService.getProdutos()
			if (produtos.length === 0) {
				return res.status(404).json({
					error: 'Produtos not found.',
				})
			}
			return res.status(200).json(produtos)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async getProdutoById(req, res, next) {
		try {
			const produtoService = new ProdutosService()
			const produto = await produtoService.getProdutoById(req.params.id)
			if (!produto) {
				return res.status(404).json({
					error: 'Produto not found.',
				})
			}
			return res.status(200).json(produto)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async updateProduto(req, res, next) {
		try {
			const produtoService = new ProdutosService()
			const updatedProduto = await produtoService.updateProduto(
				req.params.id,
				req.body
			)
			if (updatedProduto.length === 0) {
				return res.status(404).json({
					error: 'Produto not found.',
				})
			}
			return res.status(200).json(updatedProduto)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}
}

export { ProdutoController }
