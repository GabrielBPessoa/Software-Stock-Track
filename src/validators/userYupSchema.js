import * as yup from 'yup'

const emailRegex =
	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

const userSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().required().matches(emailRegex, 'Invalid email address'),
	password: yup.string().required().min(6),
	cpf: yup.string().required().matches(cpfRegex, 'Invalid cpf'),
})

const loginSchema = yup.object().shape({
	email: yup.string().required(),
	password: yup.string().required(),
})

const userUpdateSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().required().matches(emailRegex, 'Invalid email address'),
})

export { loginSchema, userSchema, userUpdateSchema }
