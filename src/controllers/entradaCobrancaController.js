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
	async getAllCobrancasByDate(req, res, next) {
		try {
			const entradaCobranca = new EntradaCobrancaService()
			const cobrancas = await entradaCobranca.getCobrancasByDate(
				req.body.startDate,
				req.body.endDate
			)
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

	async approveCobranca(req, res) {
		try {
			const entradaCobranca = new EntradaCobrancaService()
			const cobranca = await entradaCobranca.getCobrancaById(
				req.params.id
			)

			if (!cobranca) {
				return res.status(404).send({
					message: 'Cobrança not found',
				})
			}

			if (cobranca.status !== 'PENDENTE') {
				return res.status(400).send({
					message:
						'A cobrança deve estar com status de PENDENTE para poder realizar esta operação',
				})
			}
			const updatedCobranca = await entradaCobranca.approveCobranca(
				req.params.id
			)
			return res
				.status(200)
				.send({ message: 'Cobrança alterada com sucesso' })
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}

	async rejectCobranca(req, res) {
		try {
			const entradaCobranca = new EntradaCobrancaService()
			const cobranca = await entradaCobranca.getCobrancaById(
				req.params.id
			)

			if (!cobranca) {
				return res.status(404).send({
					message: 'Cobrança not found',
				})
			}

			if (cobranca.status !== 'PENDENTE') {
				return res.status(400).send({
					message:
						'A cobrança deve estar com status de PENDENTE para poder realizar esta operação',
				})
			}
			const updatedCobranca = await entradaCobranca.rejectCobranca(
				req.params.id
			)
			return res
				.status(200)
				.send({ message: 'Cobrança alterada com sucesso' })
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}
}

export { EntradaCobrancaController }
