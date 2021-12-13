import { Router } from 'express'
import { ProdutoController } from '../controllers/produtoController.js'
import { ErrorHandling } from '../middlewares/errorHandling.js'
import { EntradaProdController } from '../controllers/entradaProdController.js'
import { SaidaProdController } from '../controllers/saidaProdController.js'
import { ValidateBody } from '../middlewares/validateSchema.js'
import { ProdutoSchema } from '../validators/produtoYupSchema.js'
import { EntradaProdSchema } from '../validators/entradaProdYupSchema.js'
import { UpdateProdutoSchema } from '../validators/updateProdutoYupSchema.js'
import { UpdateEntradaProdSchema } from '../validators/updateEntradaProdYupSchema.js'
import { RelatorioController } from '../controllers/relatorioController.js'
import { SaidaCobrancaController } from '../controllers/saidaCobrancaController.js'
import { EntradaCobrancaController } from '../controllers/entradaCobrancaController.js'
import { ClienteController } from '../controllers/clienteController.js'
import { FornecedorController } from '../controllers/fornecedorController.js'

const router = Router()
const produtoController = new ProdutoController()
const errorHandling = new ErrorHandling()
const entradaProdController = new EntradaProdController()
const saidaProdController = new SaidaProdController()
const validateBody = new ValidateBody()
const relatorio = new RelatorioController()
const saidaCobranca = new SaidaCobrancaController()
const entradaCobranca = new EntradaCobrancaController()
const clienteController = new ClienteController()
const fornecedorController = new FornecedorController()

router.get('/', function (req, res) {
	res.send('Hello World')
})

router.post(
	'/produtos',
	validateBody.validateSchema(ProdutoSchema),
	produtoController.createProduto,
	errorHandling.handleError
)

router.get(
	'/produtos',
	produtoController.getAllProdutos,
	errorHandling.handleError
)

router.get(
	'/produtos/relatorio',
	relatorio.orderRelatorioByDate,
	errorHandling.handleError
)

router.get(
	'/produto/:id',
	produtoController.getProdutoById,
	errorHandling.handleError
)

router.put(
	'/produto/:id',
	validateBody.validateSchema(UpdateProdutoSchema),
	produtoController.updateProduto,
	errorHandling.handleError
)
router.post(
	'/entrada/produto',
	validateBody.validateSchema(EntradaProdSchema),
	entradaProdController.createEntradaProd,
	errorHandling.handleError
)
router.get(
	'/entrada/produto',
	entradaProdController.getAllEntradaProdutos,
	errorHandling.handleError
)
router.get(
	'/entrada/produto/:id',
	entradaProdController.getEntradaProdutoById,
	errorHandling.handleError
)
router.put(
	'/entrada/produto/:id',
	validateBody.validateSchema(UpdateEntradaProdSchema),
	entradaProdController.updateEntradaProduto,
	errorHandling.handleError
)

router.get(
	'/entrada/produtos/:startDate/:endDate',
	entradaProdController.getProdutoByDate,
	errorHandling.handleError
)

router.post(
	'/saida/produto',
	saidaProdController.createSaidaProd,
	errorHandling.handleError
)

router.get(
	'/saida/produtos',
	saidaProdController.getAllSaidaProdutos,
	errorHandling.handleError
)

router.get(
	'/saida/produtos/:startDate/:endDate',
	saidaProdController.getProdutoByDate,
	errorHandling.handleError
)

router.get(
	'/saida/cobrancas',
	saidaCobranca.getAllCobrancas,
	errorHandling.handleError
)

router.put(
	'/saida/cobranca/:id',
	saidaCobranca.approveCobranca,
	errorHandling.handleError
)

router.delete(
	'/saida/cobranca/:id',
	saidaCobranca.rejectCobranca,
	errorHandling.handleError
)

router.get(
	'/entrada/cobrancas',
	entradaCobranca.getAllCobrancas,
	errorHandling.handleError
)
router.get(
	'/saida/cobrancas/:startDate/:endDate',
	saidaCobranca.getCobrancaByDate,
	errorHandling.handleError
)
router.get(
	'/entrada/cobrancas/:startDate/:endDate',
	entradaCobranca.getAllCobrancasByDate,
	errorHandling.handleError
)

router.put(
	'/entrada/cobranca/:id',
	entradaCobranca.approveCobranca,
	errorHandling.handleError
)

router.delete(
	'/entrada/cobranca/:id',
	entradaCobranca.rejectCobranca,
	errorHandling.handleError
)

router.post(
	'/cliente',
	clienteController.createCliente,
	errorHandling.handleError
)

router.get(
	'/clientes',
	clienteController.getClientes,
	errorHandling.handleError
)

router.get(
	'/cliente/:cnpj',
	clienteController.getClientebyCnpj,
	errorHandling.handleError
)

router.put(
	'/cliente/:id',
	clienteController.updateCliente,
	errorHandling.handleError
)

router.post(
	'/fornecedor',
	fornecedorController.createFornecedor,
	errorHandling.handleError
)

router.get(
	'/fornecedores',
	fornecedorController.getFornecedores,
	errorHandling.handleError
)

router.get(
	'/fornecedor/:cnpj',
	fornecedorController.getFornecedorByCnpj,
	errorHandling.handleError
)

router.put(
	'/fornecedor/:id',
	fornecedorController.updateFornecedor,
	errorHandling.handleError
)

export { router }
