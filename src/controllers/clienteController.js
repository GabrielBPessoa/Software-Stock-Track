import { ClienteServices } from '../services/clienteServices.js'

class ClienteController {
	async createCliente(req, res) {
		try {
			const clienteServices = new ClienteServices()

			const checkClientExistence = await clienteServices.getClienteByCnpj(
				req.body.cnpj
			)
			if (checkClientExistence) {
				return res.status(400).send({
					message: 'Cliente already Exists',
				})
			}
			const createdCliente = await clienteServices.createCliente(req.body)
			return res.status(201).json(createdCliente)
		} catch (err) {
			console.log(err)
			throw new Error('failed to create a cliente')
		}
	}

	async getClientes(req, res) {
		try {
			const clienteServices = new ClienteServices()

			const clientes = await clienteServices.getAllClientes()

			return res.status(200).json(clientes)
		} catch (err) {
			console.log(err.message)
			throw new Error('failed to fetch clientes')
		}
	}

	async getClientebyCnpj(req, res) {
		try {
			const clienteServices = new ClienteServices()

			const cliente = await clienteServices.getClienteByCnpj(
				req.params.cnpj
			)

			if (!cliente) {
				return res.status(404).send({
					message: 'Cliente not Found',
				})
			}

			return res.status(200).json(cliente)
		} catch (err) {
			console.log(err.message)
			throw new Error('failed to fetch cliente')
		}
	}

	async updateCliente(req, res) {
		try {
			const clienteServices = new ClienteServices()

			const updatedCliente = await clienteServices.updateCliente(
				req.params.id,
				req.body
			)

			const checkClientExistence = await clienteServices.getClienteById(
				req.params.id
			)

			if (!checkClientExistence) {
				return res.status(404).send({
					message: 'Cliente not Exists',
				})
			}

			const checkCnpj = await clienteServices.getClienteByCnpj(
				req.body.cnpj
			)

			if (checkCnpj.id !== checkClientExistence.id) {
				return res.status(400).send({
					message: 'Cnpj already Used',
				})
			}

			return res.status(200).json(updatedCliente)
		} catch (err) {
			console.log(err.message)
			throw new Error('failed to update cliente')
		}
	}
}

export { ClienteController }
