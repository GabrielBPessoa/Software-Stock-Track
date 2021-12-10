import { FornecedorServices } from '../services/fornecedorServices.js'

class FornecedorController {
	async createFornecedor(req, res) {
		try {
			const fornecedorServices = new FornecedorServices()

			const checkFornecedorExistence =
				await fornecedorServices.getFornecedorByCnpj(req.body.cnpj)
			if (checkFornecedorExistence) {
				return res.status(400).send({
					message: 'Fornecedor already Exists',
				})
			}
			const createFornecedor = await fornecedorServices.createFornecedor(
				req.body
			)
			return res.status(201).json(createFornecedor)
		} catch (err) {
			console.log(err)
			throw new Error('failed to create a fornecedor')
		}
	}

	async getFornecedores(req, res) {
		try {
			const fornecedorServices = new FornecedorServices()

			const fornecedores = await fornecedorServices.getAllFornecedores()

			return res.status(200).json(fornecedores)
		} catch (err) {
			console.log(err.message)
			throw new Error('failed to fetch fornecedores')
		}
	}

	async getFornecedorByCnpj(req, res) {
		try {
			const fornecedorServices = new FornecedorServices()

			const fornecedor = await fornecedorServices.getFornecedorByCnpj(
				req.params.cnpj
			)

			if (!fornecedor) {
				return res.status(404).send({
					message: 'fornecedor not Found',
				})
			}

			return res.status(200).json(fornecedor)
		} catch (err) {
			console.log(err.message)
			throw new Error('failed to fetch fornecedor')
		}
	}

	async updateFornecedor(req, res) {
		try {
			const fornecedorServices = new FornecedorServices()

			const updatedFornecedor = await fornecedorServices.updateFornecedor(
				req.params.id,
				req.body
			)

			const checkFornecedorExistence =
				await fornecedorServices.getFornecedorById(req.params.id)

			if (!checkFornecedorExistence) {
				return res.status(404).send({
					message: 'Fornecedor not Exists',
				})
			}

			if (req.body.cnpj) {
				const checkCnpj = await fornecedorServices.getFornecedorByCnpj(
					req.body.cnpj
				)
				if (checkCnpj.id !== checkFornecedorExistence.id) {
					return res.status(400).send({
						message: 'Cnpj already Used',
					})
				}
			}

			return res.status(200).json(updatedFornecedor)
		} catch (err) {
			console.log(err.message)
			throw new Error('failed to update Fornecedor')
		}
	}
}

export { FornecedorController }
