import * as yup from 'yup'
import { CommonModules } from '../common/commonModules.js'

export const EntradaProdSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	lote: yup.string().required(),
	dataValidade: yup
		.string()
		.matches(
			/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
			'Preencha uma data válida - DD/MM/YYYY - maior que 7 dias'
		)
		.required()
		.test(
			'validateDate',
			'preencha uma data válida maior que 7 dias',
			async function (value) {
				const commonModules = new CommonModules()
				return await commonModules.validateDate(value)
			}
		),
})
