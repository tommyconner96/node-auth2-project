const jwt = require("jsonwebtoken")
const users = require("../users/user-model")

function restrict() {
	return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		}

		try {
			// manually pull the token that got sent from the client's cookie jar
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			//checks to make sure the signature is valid and the token is not expired
			jwt.verify(token, "secret secret", (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}
				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict
