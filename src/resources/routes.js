import { Router } from 'express'
import { ProdutoController } from '../controllers/produtoController.js'
import { ErrorHandling } from '../middlewares/errorHandling.js'

const router = Router()
const produtoController = new ProdutoController()
const errorHandling = new ErrorHandling()

router.get('/', function (req, res) {
	res.send('Hello World')
})

router.post(
	'/api/produtos',
	produtoController.createProduto,
	errorHandling.handleError
)

router.get(
	'/api/produtos',
	produtoController.getAllProdutos,
	errorHandling.handleError
)

router.get(
	'/api/produto/:id',
	produtoController.getProdutoById,
	errorHandling.handleError
)

router.put(
	'/api/produto/:id',
	produtoController.updateProduto,
	errorHandling.handleError
)

export { router }
