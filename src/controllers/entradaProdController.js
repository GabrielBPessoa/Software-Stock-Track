import { entradaProdService } from '../services/entradaProdServices.js'
import { entradaProdDbModules } from '../modules/entradaProdModules.js'
import { EntradaCobrancaService } from '../services/entradaCobrancaServices.js'
import { FornecedorServices } from '../services/fornecedorServices.js'

class EntradaProdController {
	async createEntradaProd(req, res, next) {
		try {
			const userFullName = `${req.user.firstName} ${req.user.lastName}`
			const entradaProdutoService = new entradaProdService()
			const entradaProd = new entradaProdDbModules()
			const fornecedorServices = new FornecedorServices()
			const entradaCobrancaService = new EntradaCobrancaService()

			const data = {
				nome: req.body.nome,
				lote: req.body.lote,
				dataValidade: req.body.dataValidade,
				funcionario: userFullName,
				precoCusto: req.body.precoCusto,
				quantidade: req.body.quantidade,
				unidade: req.body.unidade,
				nomeFornecedor: req.body.nomeFornecedor,
				cnpjFornecedor: req.body.cnpjFornecedor,
				enderecoFornecedor: req.body.enderecoFornecedor,
				telefoneFornecedor: req.body.telefoneFornecedor,
				dataFabricacao: req.body.dataFabricacao,
				descricaoProduto: req.body.descricaoProduto,
			}

			const checkLote = await entradaProd.getEntradaProdutoByLote(
				data.lote
			)

			if (checkLote) {
				return res.status(400).send({
					error: 'lote already exists',
				})
			}
			const entradaProduto =
				await entradaProdutoService.createEntradaProd(data)
			if (!entradaProduto) {
				return res.status(400).json({
					error: 'Data de validade inválida. Deve ser maior que 7 dias',
				})
			}

			const checkFornecedor =
				await fornecedorServices.getFornecedorByCnpj(
					req.body.cnpjFornecedor
				)
			if (!checkFornecedor) {
				const dadosFornecedor = {
					nome: req.body.nomeFornecedor,
					cnpj: req.body.cnpjFornecedor,
					endereco: req.body.enderecoFornecedor,
					telefone: req.body.telefoneFornecedor,
				}
				await fornecedorServices.createFornecedor(dadosFornecedor)
			}

			const dataCobranca = {
				numeroPedido: entradaProduto[0].id,
				valor: entradaProduto[0].total,
				nomeFornecedor: req.body.nomeFornecedor,
				cnpjFornecedor: req.body.cnpjFornecedor,
				enderecoFornecedor: req.body.enderecoFornecedor,
				telefoneFornecedor: req.body.telefoneFornecedor,
			}
			const cobranca = await entradaCobrancaService.createSaidaCobranca(
				dataCobranca
			)
			console.log(cobranca)
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
