import { entradaProdService } from '../services/entradaProdServices.js'

class EntradaProdController {
	async createEntradaProd(req, res, next) {
		try {
			const userFullName = `${req.user.firstName} ${req.user.lastName}`
			const entradaProdutoService = new entradaProdService()
			const data = {
				nome: req.body.nome,
				lote: req.body.lote,
				dataValidade: req.body.dataValidade,
				funcionario: userFullName,
				precoCusto: req.body.precoCusto,
				quantidade: req.body.quantidade,
				unidade: req.body.unidade,
			}
			const entradaProduto =
				await entradaProdutoService.createEntradaProd(data)
			if (!entradaProduto) {
				return res.status(400).json({
					error: 'Data de validade inválida. Deve ser maior que 7 dias',
				})
			}
			return res.status(201).json(entradaProduto)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async getAllEntradaProdutos(req, res, next) {
		try {
			const entradaProdutoService = new entradaProdService()
			const entradaprodutos =
				await entradaProdutoService.getentradaProdutos()
			if (entradaprodutos.length === 0) {
				return res.status(404).json({
					error: 'Produtos not found.',
				})
			}
			return res.status(200).json(entradaprodutos)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async getEntradaProdutoById(req, res, next) {
		try {
			const entradaProdutoService = new entradaProdService()
			const entradaProduto =
				await entradaProdutoService.getEntradaProdutoById(req.params.id)
			if (!entradaProduto) {
				return res.status(404).json({
					error: 'Produto not found.',
				})
			}
			return res.status(200).json(entradaProduto)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async updateEntradaProduto(req, res, next) {
		try {
			const entradaProdutoService = new entradaProdService()
			const updatedEntradaProduto =
				await entradaProdutoService.updateEntradaProduto(
					req.params.id,
					req.body
				)
			if (!updatedEntradaProduto) {
				return res
					.status(400)
					.json({ error: 'Data de Validade menor que 7 dias' })
			}
			return res.status(200).json(updatedEntradaProduto)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}
}

export { EntradaProdController }
