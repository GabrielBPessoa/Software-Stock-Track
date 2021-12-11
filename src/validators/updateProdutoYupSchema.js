import * as yup from 'yup'

export const UpdateProdutoSchema = yup.object().shape({
	descricao: yup.string(),
	precoCusto: yup.number().positive('Preço precisa ser positivo'),
	margemLucro: yup.number().positive('Margem de Lucro precisa ser positiva'),
})
