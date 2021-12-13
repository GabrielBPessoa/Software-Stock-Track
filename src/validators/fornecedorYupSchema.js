import * as yup from 'yup'

export const FornecedorSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	cnpj: yup.string().min(16).max(16).required(),
	endereco: yup.string().required(),
	telefone: yup.string().required(),
})
