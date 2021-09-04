import bcrypt from 'bcryptjs'
import { UserService } from '../services/userServices.js'
import { Strategy } from 'passport-local'
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt'

const userService = new UserService()

const passportAuth = (passport) => {
	const authenticateUser = async (email, password, done) => {
		const user = await userService.getUserByEmail(email)
		if (user == null) {
			return done(null, false, { message: 'User not found' })
		}

		try {
			const isMatch = await bcrypt.compareSync(password, user.password)
			return isMatch
				? done(null, user)
				: done(null, false, { message: 'Incorrect Password' })
		} catch (error) {
			console.log(error)
			return done(error)
		}
	}

	passport.use(new Strategy({ usernameField: 'email' }, authenticateUser))
	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	passport.deserializeUser(async (id, done) => {
		const user = await userService.getUserById(id)
		return done(null, user)
	})
	passport.use(
		new JWTstrategy(
			{
				secretOrKey: 'TOP_SECRET',
				jwtFromRequest:
					ExtractJWT.fromAuthHeaderAsBearerToken('secret_token'),
			},
			async (token, done) => {
				try {
					return done(null, token.user)
				} catch (error) {
					done(error)
				}
			}
		)
	)
}

export { passportAuth }
