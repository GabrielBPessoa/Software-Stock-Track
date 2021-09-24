import * as yup from 'yup'

export const EntradaProdSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	lote: yup.string().required(),
	dataValidade: yup.date().required(),
})
