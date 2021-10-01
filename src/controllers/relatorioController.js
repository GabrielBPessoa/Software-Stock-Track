import { Relatorio } from '../services/relatorioService.js'

class RelatorioController {
	async orderRelatorioByDate(req, res, next) {
		const relatorio = new Relatorio()
		const itens = await relatorio.orderProdutosByDate()

		return res.send(itens)
	}
}

export { RelatorioController }
