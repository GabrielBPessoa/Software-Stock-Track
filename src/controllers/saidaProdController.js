import { SaidaProdService } from '../services/saidaProdServices.js'
import { ProdutosDbModules } from '../modules/produtosDbModules.js'
import { entradaProdDbModules } from '../modules/entradaProdModules.js'

class SaidaProdController {
	async createSaidaProd(req, res, next) {
		try {
			const userFullName = `${req.user.firstName} ${req.user.lastName}`

			const saidaProdutoService = new SaidaProdService()
			const produtosDbModules = new ProdutosDbModules()
			const entradaDbModules = new entradaProdDbModules()

			const data = {
				nome: req.body.nome,
				lote: req.body.lote,
				funcionario: userFullName,
				precoVenda: req.body.precoVenda,
				quantidade: req.body.quantidade,
			}

			const produtoExists = await produtosDbModules.checkProdutoByNome(
				data.nome.toLowerCase()
			)
			if (!produtoExists) {
				return res.status(404).send({
					message: 'Produto not found',
				})
			}

			const entradaInfo = await entradaDbModules.getEntradaProdutoByLote(
				data.lote
			)
			console.log(entradaInfo)
			if (!entradaInfo || data.nome.toLowerCase() !== entradaInfo.nome) {
				return res.status(404).send({
					error: 'lote not found, check lote number or product',
				})
			}

			const quantidadeSaidas = await saidaProdutoService.getMetrics(
				data.lote
			)

			const quantidadeDisponivel =
				entradaInfo.quantidade - quantidadeSaidas

			if (data.quantidade > quantidadeDisponivel) {
				return res.status(400).send({
					error: `A quantidade permitida para este lote é: ${quantidadeDisponivel}`,
				})
			}

			const saidaProduto = await saidaProdutoService.createSaidaProd(data)
			return res.status(201).json(saidaProduto)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async getAllSaidaProdutos(req, res, next) {
		try {
			const saidaProdutoService = new SaidaProdService()
			const saidaprodutos = await saidaProdutoService.getAllSaidas()
			if (saidaprodutos.length === 0) {
				return res.status(404).json({
					error: 'Produtos not found.',
				})
			}
			return res.status(200).json(saidaprodutos)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async getSaidaProdutoById(req, res, next) {
		try {
			const saidaProdutoService = new SaidaProdService()
			const saidaProduto = await saidaProdutoService.getSaidaById(
				req.params.id
			)
			if (!saidaProduto) {
				return res.status(404).json({
					error: 'Venda not found.',
				})
			}
			return res.status(200).json(saidaProduto)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async updateSaidaProduto(req, res, next) {
		try {
			const saidaProdutoService = new SaidaProdService()
			const updatedSaidaProduto = await saidaProdutoService.updateSaida(
				req.params.id,
				req.body
			)
			if (!updatedSaidaProduto) {
				return res.status(404).json({ error: 'Venda not found.' })
			}
			return res.status(200).json(updatedSaidaProduto)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}
}

export { SaidaProdController }
