import { SaidaProdService } from '../services/saidaProdServices.js'
import { SaidaCobrancaService } from '../services/saidaCobrancaServices.js'
import { ProdutosDbModules } from '../modules/produtosDbModules.js'
import { entradaProdDbModules } from '../modules/entradaProdModules.js'
import { ClienteServices } from '../services/clienteServices.js'

class SaidaProdController {
	async createSaidaProd(req, res, next) {
		try {
			const userFullName = `${req.user.firstName} ${req.user.lastName}`

			const saidaProdutoService = new SaidaProdService()
			const saidaCobrancaService = new SaidaCobrancaService()
			const produtosDbModules = new ProdutosDbModules()
			const entradaDbModules = new entradaProdDbModules()
			const clienteServices = new ClienteServices()

			const data = {
				nome: req.body.nome,
				lote: req.body.lote,
				funcionario: userFullName,
				quantidade: req.body.quantidade,
				nomeCliente: req.body.nomeCliente,
				cnpjCliente: req.body.cnpjCliente,
				endereçoCliente: req.body.endereçoCliente,
				telefoneCliente: req.body.telefoneCliente,
				precoVenda: '',
				dataValidade: '',
				dataFabricacao: '',
				unidade: '',
				descricaoProduto: '',
			}

			const produtoExists = await produtosDbModules.checkProdutoByNome(
				data.nome.toLowerCase()
			)
			if (!produtoExists) {
				return res.status(404).send({
					message: 'Produto not found',
				})
			}

			if (produtoExists.status === 'inativo') {
				return res.status(400).send({
					message: 'Produto está inativo',
				})
			}

			const entradaInfo = await entradaDbModules.getEntradaProdutoByLote(
				data.lote
			)

			if (!entradaInfo || data.nome.toLowerCase() !== entradaInfo.nome) {
				return res.status(404).send({
					error: 'lote not found, check lote number or product',
				})
			}

			const checkCliente = await clienteServices.getClienteByCnpj(
				req.body.cnpjCliente
			)
			if (!checkCliente) {
				const dadosCliente = {
					nome: req.body.nomeCliente,
					cnpj: req.body.cnpjCliente,
					endereco: req.body.endereçoCliente,
					telefone: req.body.telefoneCliente,
				}
				await clienteServices.createCliente(dadosCliente)
			}

			data.precoVenda =
				entradaInfo.precoCusto * (1 + produtoExists.margemLucro / 100)

			data.dataValidade = entradaInfo.dataValidade
			data.dataFabricacao = entradaInfo.dataFabricacao
			data.unidade = entradaInfo.unidade
			data.descricaoProduto = entradaInfo.descricaoProduto

			const today = new Date()

			if (data.dataValidade < today) {
				return res.status(400).send({
					error: 'data de validade menor que a data atual',
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
			const dataCobranca = {
				numeroPedido: saidaProduto[0].id,
				valor: saidaProduto[0].total,
				nomeDevedor: req.body.nomeCliente,
				cnpjDevedor: req.body.cnpjCliente,
				enderecoDevedor: req.body.endereçoCliente,
				telefoneDevedor: req.body.telefoneCliente,
			}
			const cobranca = await saidaCobrancaService.createSaidaCobranca(
				dataCobranca
			)
			return res.status(201).json(saidaProduto)
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
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
			throw new Error('Something went wrong')
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
			throw new Error('Something went wrong')
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
			throw new Error('Something went wrong')
		}
	}

	async getProdutoByDate(req, res, next) {
		try {
			const saidaProdutoService = new SaidaProdService()
			const produtos = await saidaProdutoService.getProdutoByDateRange(
				req.params.startDate,
				req.params.endDate
			)
			if (produtos.length === 0) {
				return res.status(404).json({
					error: 'Produtos not found.',
				})
			}
			return res.status(200).json(produtos)
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}
}

export { SaidaProdController }
