import { Router } from 'express'
import { Authentication } from './authService.js'
import { UserController } from '../controllers/userController.js'
import { ErrorHandling } from '../middlewares/errorHandling.js'
import { ValidateBody } from '../middlewares/validateSchema.js'
import {
	userSchema,
	userUpdateSchema,
	loginSchema,
} from '../validators/userYupSchema.js'

const authRouter = Router()
const userController = new UserController()
const errorHandling = new ErrorHandling()
const authenticate = new Authentication()
const validateBody = new ValidateBody()

authRouter.post(
	'/user',
	validateBody.validateSchema(userSchema),
	userController.createUser,
	errorHandling.handleError
)

authRouter.get('/users', userController.getAllUsers, errorHandling.handleError)

authRouter.get(
	'/user/:id',
	userController.getUserById,
	errorHandling.handleError
)
authRouter.put(
	'/user/:id',
	validateBody.validateSchema(userUpdateSchema),
	userController.updateUser,
	errorHandling.handleError
)

authRouter.post(
	'/login',
	validateBody.validateSchema(loginSchema),
	authenticate.login
)

export { authRouter }
