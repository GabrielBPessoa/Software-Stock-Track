import * as yup from 'yup'

export const ProdutoSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	descricao: yup.string().required(),
	precoCusto: yup.number().required().positive('Preço precisa ser positivo'),
	margemLucro: yup.number().positive('Margem de Lucro precisa ser positiva'),
})
