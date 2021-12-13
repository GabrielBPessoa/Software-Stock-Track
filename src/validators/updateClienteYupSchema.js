import * as yup from 'yup'

export const UpdateClienteSchema = yup.object().shape({
	nome: yup.string().max(255),
	cnpj: yup.string().min(14).max(14),
	endereco: yup.string(),
	telefone: yup.string(),
})
