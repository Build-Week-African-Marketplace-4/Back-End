const express = require('express')
const helmet = require('helmet')
const cors = require('cors')


const authRouter = require("../auth/auth_router")



const server = express()



server.use(helmet())
server.use(express.json())
server.use(cors())  // may need to change this???


server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.send('THERE IS FOOD OUT THERE! 🌽🥕')
})

module.exports = server