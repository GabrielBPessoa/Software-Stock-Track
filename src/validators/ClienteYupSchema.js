import * as yup from 'yup'

export const ClienteSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	cnpj: yup.string().min(14).max(14).required(),
	endereco: yup.string().required(),
	telefone: yup.string().required(),
})
