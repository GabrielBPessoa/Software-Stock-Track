import * as yup from 'yup'
import { CommonModules } from '../common/commonModules.js'

export const UpdateEntradaProdSchema = yup.object().shape({
	nome: yup.string().max(255),
	lote: yup.string(),
	precoCusto: yup.number().positive('Preço precisa ser positivo'),
	quantidade: yup
		.number()

		.integer()
		.positive('Quantidade precisa ser valor inteiro e positivo'),
	unidade: yup.string().oneOf(['cx', 'kg', 'lt']),
	dataValidade: yup
		.string()
		.required()
		.matches(
			/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
			'Preencha uma data válida - DD/MM/YYYY - maior que 7 dias'
		)
		.test(
			'validateDate',
			'preencha uma data válida maior que 7 dias',
			async function (value) {
				const commonModules = new CommonModules()
				return await commonModules.validateDate(value)
			}
		),
})
