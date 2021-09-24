import * as yup from 'yup'

// const date = new Date()
// console.log('DATE', date)

export const ProdutoSchema = yup.object().shape({
	nome: yup.string().required().max(255),
	descricao: yup.string().required(),
	validade: yup.date().required(),
})
