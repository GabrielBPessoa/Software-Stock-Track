import { dbConnect } from '../../data/db.js'

class UserDbModules {
	async createUser(firstName, lastName, email, password, cpf) {
		try {
			const user = await dbConnect('user')
				.insert({
					firstName,
					lastName,
					email,
					password,
					cpf,
				})
				.returning([
					'id',
					'firstName',
					'lastName',
					'email',
					'password',
					'cpf',
					'created_at',
					'updated_at',
				])
			return user
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in createUserModules')
		}
	}

	async getUserById(id) {
		try {
			const user = dbConnect('user').where('id', id).first()
			return user
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getUserById')
		}
	}

	async updateUser(id, firstName, lastName, email) {
		try {
			const date = new Date()
			const updatedUser = await dbConnect('user').where('id', id).update(
				{
					firstName: firstName,
					lastName: lastName,
					email: email,
					updated_at: date,
				},
				[
					'id',
					'firstName',
					'lastName',
					'email',
					'password',
					'cpf',
					'created_at',
					'updated_at',
				]
			)
			return updatedUser
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateUser')
		}
	}

	async getUsers() {
		try {
			const users = await dbConnect('user').select().table('user')
			return users
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getUsers')
		}
	}
}

export { UserDbModules }
