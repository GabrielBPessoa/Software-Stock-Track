import { UserService } from '../services/userServices.js'

class UserController {
	async createUser(req, res, next) {
		try {
			const userService = new UserService()
			const createdUser = await userService.createUser(req.body)
			return res.status(201).json(createdUser)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async getAllUsers(req, res, next) {
		try {
			const userService = new UserService()
			const users = await userService.getUsers()
			if (users.length === 0) {
				return res.status(404).json({
					error: 'Users not found.',
				})
			}
			return res.status(200).json(users)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async getUserById(req, res, next) {
		try {
			const userService = new UserService()
			const user = await userService.getUserById(req.params.id)
			if (!user) {
				return res.status(404).json({
					error: 'User not found.',
				})
			}
			return res.status(200).json(user)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}

	async updateUser(req, res, next) {
		try {
			const userService = new UserService()
			const updatedUser = await userService.updateUser(
				req.params.id,
				req.body
			)
			return res.status(200).json(updatedUser)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}
}

export { UserController }
