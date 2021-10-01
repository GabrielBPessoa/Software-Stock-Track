import express from 'express'
import dotenv from 'dotenv'
import { router } from './src/resources/routes.js'
import { authRouter } from './src/authentication/routes.js'
import passport from 'passport'
import { passportAuth } from './src/authentication/passportStrategy.js'
import { Authentication } from './src/authentication/authService.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

const run = async () => {
	try {
		app.use(express.json())
		app.use(express.urlencoded({ extended: true }))
		passportAuth(passport)
		app.use(passport.initialize())
		const auth = new Authentication()
		app.use('/auth', authRouter)
		app.use(
			'/api',
			passport.authenticate('jwt'),
			auth.validateToken,
			router
		)
		console.log(`\nStarting SST Core server in ${NODE_ENV}`)
		app.listen(PORT, () => {
			const date = new Date()
			console.log(`${date} - Server running in port: [${PORT}]`)
		})
	} catch (e) {
		console.error(e)
	}
}

run()
