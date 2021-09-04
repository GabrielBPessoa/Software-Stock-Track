import { Router } from 'express'
import { ProdutoController } from '../controllers/produtoController.js'
import { ErrorHandling } from '../middlewares/errorHandling.js'
import { EntradaProdController } from '../controllers/entradaProdController.js'

const router = Router()
const produtoController = new ProdutoController()
const errorHandling = new ErrorHandling()
const entradaProdController = new EntradaProdController()

router.get('/', function (req, res) {
	res.send('Hello World')
})

router.post(
	'/produtos',
	produtoController.createProduto,
	errorHandling.handleError
)

router.get(
	'/produtos',
	produtoController.getAllProdutos,
	errorHandling.handleError
)

router.get(
	'/produto/:id',
	produtoController.getProdutoById,
	errorHandling.handleError
)

router.put(
	'/produto/:id',
	produtoController.updateProduto,
	errorHandling.handleError
)
router.post(
	'/entrada/produto',
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
	entradaProdController.updateEntradaProduto,
	errorHandling.handleError
)
export { router }
