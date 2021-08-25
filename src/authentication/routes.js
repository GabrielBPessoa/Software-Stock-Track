import { Router } from 'express'
import { UserController } from '../controllers/userController.js'
import { ErrorHandling } from '../middlewares/errorHandling.js'

const authRouter = Router()
const userController = new UserController()
const errorHandling = new ErrorHandling()

authRouter.post('/user', userController.createUser, errorHandling.handleError)

authRouter.get('/users', userController.getAllUsers, errorHandling.handleError)

authRouter.get(
	'/user/:id',
	userController.getUserById,
	errorHandling.handleError
)
authRouter.put(
	'/user/:id',
	userController.updateUser,
	errorHandling.handleError
)

export { authRouter }
