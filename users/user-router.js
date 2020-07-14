const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("./user-model")
const restrict = require("../middleware/restrict")
const jwt = require("jsonwebtoken")

const router = express.Router()

// GET users
router.get("/users", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch (err) {
        next(err)
    }
})


// POST to register new user
router.post("/register", async (req, res, next) => {
    try {
        const { username, password, department } = req.body
        const user = await Users.findBy({ username }).first()

        if (user) {
            return res.status(409).json({
                message: "Username is already taken",
            })
        }

        const newUser = await Users.add({
            username,
            // hash the password with a time complexity of "14"
            password: await bcrypt.hash(password, 14),
            department
        })

        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
})

// LOGIN
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()

        if (!user) {
            return res.status(401).json({
                message: "You shall not pass",
            })
        }

        // hash the password again and see if it matches what we have in the database
        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "You shall not pass",
            })
        }

		const payload = {
			userId: user.id,
			username: user.username,
		}

		// send the token back as a cookie so the client automatically stores it
		res.cookie("token", jwt.sign(payload, "secret secret"))

		res.json({
			message: `Welcome ${user.username}!`,
		})
    } catch (err) {
        next(err)
    }
})

// LOGOUT
// router.get("/logout", async (req, res, next) => {
//     try {
//         req.session.destroy((err) => {
//             if (err) {
//                 next(err)
//             } else {
//                 res.status(204).end()
//             }
//         })
//     } catch (err) {
//         next(err)
//     }
// })

module.exports = router
