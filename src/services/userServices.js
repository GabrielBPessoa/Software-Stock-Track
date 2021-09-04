import { UserDbModules } from '../modules/userDbModules.js'
import bcrypt from 'bcryptjs'

class UserService {
	async createUser(userData) {
		try {
			const { firstName, lastName, email, password, cpf } = userData
			const userDbModules = new UserDbModules()
			const hashpassword = await bcrypt.hash(password, 10)
			const createdUser = await userDbModules.createUser(
				firstName,
				lastName,
				email,
				hashpassword,
				cpf
			)
			return createdUser
		} catch (err) {
			console.log(err.message)
			throw new Error('something went wrong in createUserService')
		}
	}

	async getUsers() {
		try {
			const userDbModules = new UserDbModules()
			const users = await userDbModules.getUsers()
			return users
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getUsersService')
		}
	}

	async getUserById(id) {
		try {
			const userDbModules = new UserDbModules()
			const user = await userDbModules.getUserById(id)
			return user
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getUserByIdService')
		}
	}

	async updateUser(id, info) {
		try {
			const userDbModules = new UserDbModules()
			const updatedUser = await userDbModules.updateUser(
				id,
				info.firstName,
				info.lastName,
				info.email
			)
			return updatedUser
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateUserService')
		}
	}
	async getUserByEmail(email) {
		try {
			const userDbModules = new UserDbModules()
			const user = await userDbModules.getUserByEmail(email)
			return user
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getUserByEmailService')
		}
	}
}

export { UserService }
