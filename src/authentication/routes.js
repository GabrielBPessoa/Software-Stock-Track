import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
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

authRouter.post('/login', async (req, res, next) => {
	passport.authenticate(
		'local',
		{ session: false },
		async (err, user, info) => {
			try {
				console.log(info)
				if (err || !user) {
					return res.status(404).send({
						message: 'Username or Password is wrong',
					})
				}

				req.login(user, async (error) => {
					if (error)
						return res.status(500).send({
							message: 'Something went Wrong',
						})

					const body = {
						email: user.email,
						cpf: user.cpf,
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
					}
					const token = jwt.sign({ user: body }, 'TOP_SECRET', {
						expiresIn: 1800,
					})
					return res.json({ token })
				})
			} catch (error) {
				console.log(error)
				return res.status(500).send({
					message: 'Something went Wrong',
				})
			}
		}
	)(req, res, next)
})

export { authRouter }
