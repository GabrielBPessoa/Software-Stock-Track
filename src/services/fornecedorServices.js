import { FornecedorDbModules } from '../modules/fornecedorDbModules.js'

class FornecedorServices {
	async createFornecedor(data) {
		try {
			const { nome, cnpj, endereco, telefone } = data
			const fornecedorDbModules = new FornecedorDbModules()
			const createFornecedor = await fornecedorDbModules.createFornecedor(
				nome,
				cnpj,
				endereco,
				telefone
			)
			return createFornecedor
		} catch (err) {
			console.log(err.message)
			throw new Error('something went wrong in createFornecedor')
		}
	}

	async getAllFornecedores() {
		try {
			const fornecedorDbModules = new FornecedorDbModules()
			const fornecedores = await fornecedorDbModules.getFornecedores()
			return fornecedores
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getAllFornecedores')
		}
	}

	async getFornecedorById(id) {
		try {
			const fornecedorDbModules = new FornecedorDbModules()
			const fornecedor = await fornecedorDbModules.getFornecedorById(id)
			return fornecedor
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getFornecedorById')
		}
	}

	async getFornecedorByCnpj(cnpj) {
		try {
			const fornecedorDbModules = new FornecedorDbModules()
			const fornecedor = await fornecedorDbModules.getFornecedorByCnpj(
				cnpj
			)
			return fornecedor
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getFornecedorById')
		}
	}

	async updateFornecedor(id, info) {
		try {
			const fornecedorDbModules = new FornecedorDbModules()
			const updatedFornecedor =
				await fornecedorDbModules.updateFornecedor(
					id,
					info.nome,
					info.cnpj,
					info.endereco,
					info.telefone
				)
			return updatedFornecedor
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateFornecedor')
		}
	}
}

export { FornecedorServices }
