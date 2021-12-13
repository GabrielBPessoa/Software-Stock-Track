import { dbConnect } from '../../data/db.js'

class Relatorio {
	async orderProdutosByDate() {
		try {
			const itens = await dbConnect('entradaProd').orderBy('dataValidade')
			if (!itens) {
				return res.status(404).send({
					message: 'No Itens Found',
				})
			}
			return itens
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong in orderProdutosByDate')
		}
	}
}

export { Relatorio }
