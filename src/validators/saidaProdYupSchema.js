import * as yup from 'yup'

export const saidaProdutoSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	lote: yup.string().required(),
	quantidade: yup
		.number()
		.integer()
		.required()
		.positive('quantidade precisa ser positivo'),
	nomeCliente: yup.string().max(255).required(),
	cnpjCliente: yup.string().min(14).max(14).required(),
	endereçoCliente: yup.string().required(),
	telefoneCliente: yup.string().required(),
})
