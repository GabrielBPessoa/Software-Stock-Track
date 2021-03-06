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

			let total = 0
			for (let i = 0; i < cobrancas.length; i++) {
				if (cobrancas[i].status === 'PENDENTE') {
					total += cobrancas[i].valor
				}
			}

			return res.status(200).json({ cobrancas, total })
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}
	async getCobrancaByDate(req, res, next) {
		try {
			const saidaCobranca = new SaidaCobrancaService()
			const cobrancas = await saidaCobranca.getCobrancaByDateRange(
				req.params.startDate,
				req.params.endDate
			)
			if (cobrancas.length === 0) {
				return res.status(404).json({
					error: 'Cobrancas not found.',
				})
			}

			let total = 0
			for (let i = 0; i < cobrancas.length; i++) {
				if (cobrancas[i].status === 'PENDENTE') {
					total += cobrancas[i].valor
				}
			}

			return res.status(200).json({ cobrancas, total })
		} catch (err) {
			console.log(err.message)
			throw new Error('Something went wrong')
		}
	}

	async approveCobranca(req, res) {
		try {
			const saidaCobranca = new SaidaCobrancaService()
			const cobranca = await saidaCobranca.getCobrancaById(req.params.id)

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
			const updatedCobranca = await saidaCobranca.approveCobranca(
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
			const saidaCobranca = new SaidaCobrancaService()
			const cobranca = await saidaCobranca.getCobrancaById(req.params.id)

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
			const updatedCobranca = await saidaCobranca.rejectCobranca(
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

export { SaidaCobrancaController }
