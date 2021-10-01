import { dbConnect } from '../../data/db.js'

class ProdutosDbModules {
	async createProduto(
		nome,
		descricao,
		precoCusto,
		margemLucro,
		quantidade,
		unidade
	) {
		try {
			if (descricao === undefined) {
				descricao = 'Descrição Padrão'
			}
			const produto = await dbConnect('produtos')
				.insert({
					nome,
					descricao,
					precoCusto,
					margemLucro,
					quantidade,
					unidade,
				})
				.returning([
					'id',
					'nome',
					'descricao',
					'precoCusto',
					'margemLucro',
					'created_at',
					'updated_at',
				])
			return produto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in createProdutoModules')
		}
	}

	async getProdutoById(id) {
		try {
			const produto = dbConnect('produtos').where('id', id).first()
			return produto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getProdutoById')
		}
	}

	async checkProdutoByNome(nome) {
		try {
			const produto = dbConnect('produtos').where('nome', nome).first()
			return produto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getProdutoByNome')
		}
	}

	async updateProduto(
		id,
		nome,
		descricao,
		precoCusto,
		margemLucro,
		updatedQuantidade,
		unidade
	) {
		try {
			const date = new Date()
			const updatedProduto = await dbConnect('produtos')
				.where('id', id)
				.update(
					{
						nome: nome,
						descricao: descricao,
						precoCusto: precoCusto,
						margemLucro: margemLucro,
						quantidade: updatedQuantidade,
						unidade: unidade,
						updated_at: date,
					},
					[
						'id',
						'nome',
						'descricao',
						'precoCusto',
						'margemLucro',
						'quantidade',
						'unidade',
						'created_at',
						'updated_at',
					]
				)
			return updatedProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateProduto')
		}
	}

	async updateQuantidadeProduto(id, updatedQuantidade, unidade) {
		try {
			const date = new Date()
			const updatedProduto = await dbConnect('produtos')
				.where('id', id)
				.update(
					{
						quantidade: updatedQuantidade,
						unidade: unidade,
						updated_at: date,
					},
					[
						'id',
						'nome',
						'descricao',
						'precoCusto',
						'margemLucro',
						'quantidade',
						'unidade',
						'created_at',
						'updated_at',
					]
				)
			return updatedProduto
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in updateProduto')
		}
	}

	async getProdutos() {
		try {
			const produtos = await dbConnect('produtos')
				.select()
				.table('produtos')
			return produtos
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in getProdutos')
		}
	}
}

export { ProdutosDbModules }
