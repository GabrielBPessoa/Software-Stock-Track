import * as yup from 'yup'

export const UpdateProdutoSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	descricao: yup.string(),
	precoCusto: yup.number().positive('Preço precisa ser positivo'),
	margemLucro: yup.number().positive('Margem de Lucro precisa ser positiva'),
})
