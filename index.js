const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const usersRouter = require("./users/user-router")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors({
	credentials: true,
	origin: "http://localhost:3000",
}))
server.use(express.json())
server.use(cookieParser())

server.use("/api", usersRouter)
server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
