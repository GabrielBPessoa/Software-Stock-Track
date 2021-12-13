import * as yup from 'yup'
import { CommonModules } from '../common/commonModules.js'

export const EntradaProdSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	lote: yup.string().required(),
	precoCusto: yup.number().required().positive('Preço precisa ser positivo'),
	quantidade: yup
		.number()
		.required()
		.integer()
		.positive('Quantidade precisa ser valor inteiro e positivo'),
	unidade: yup.string().required().oneOf(['cx', 'kg', 'lt']),
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
	nomeFornecedor: yup.string().max(255).required(),
	cnpjFornecedor: yup.string().min(14).max(14).required(),
	enderecoFornecedor: yup.string().required(),
	telefoneFornecedor: yup.string().required(),
})
