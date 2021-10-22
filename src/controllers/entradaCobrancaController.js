import { EntradaCobrancaService } from '../services/entradaCobrancaServices.js'

class EntradaCobrancaController {
	async getAllCobrancas(req, res, next) {
		try {
			const entradaCobranca = new EntradaCobrancaService()
			const cobrancas = await entradaCobranca.getAllCobrancas()
			if (cobrancas.length === 0) {
				return res.status(404).json({
					error: 'Cobrancas not found.',
				})
			}
			return res.status(200).json(cobrancas)
		} catch (err) {
			console.log(err.message)
			next(err)
		}
	}
}

export { EntradaCobrancaController }
