import { SaidaCobrancaService } from '../services/saidaCobrancaServices.js'

class SaidaCobrancaController {
	async getAllCobrancas(req, res, next) {
		try {
			const saidaCobranca = new SaidaCobrancaService()
			const cobrancas = await saidaCobranca.getAllCobrancas()
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

export { SaidaCobrancaController }
