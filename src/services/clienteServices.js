import { ClienteDbModules } from '../modules/clienteDbModules.js'

class ClienteServices {
	async createCliente(data) {
		try {
			const { nome, cnpj, endereco, telefone } = data
			const clienteDbModules = new ClienteDbModules()
			const createCliente = await clienteDbModules.createCliente(
				nome,
				cnpj,
				endereco,
				telefone
			)
			return createCliente
		} catch (err) {
			console.log(err.message)
			throw new Error('something went wrong in createCliente')
		}
	}

	async getAllClientes() {
		try {
			const clienteDbModules = new ClienteDbModules()
			const clientes = await clienteDbModules.getClientes()
			return clientes
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getAllClientes')
		}
	}

	async getClienteById(id) {
		try {
			const clienteDbModules = new ClienteDbModules()
			const cliente = await clienteDbModules.getClienteById(id)
			return cliente
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getClienteById')
		}
	}

	async getClienteByCnpj(cnpj) {
		try {
			const clienteDbModules = new ClienteDbModules()
			const cliente = await clienteDbModules.getClienteByCnpj(cnpj)
			return cliente
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getClienteById')
		}
	}

	async updateCliente(id, info) {
		try {
			const clienteDbModules = new ClienteDbModules()
			const updatedCliente = await clienteDbModules.updateCliente(
				id,
				info.nome,
				info.cnpj,
				info.endereco,
				info.telefone
			)
			return updatedCliente
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateCliente')
		}
	}
}

export { ClienteServices }
