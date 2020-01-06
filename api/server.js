const express = require('express')
const helmet = require('helmet')
const cors = require('cors')


const authRouter = require("../auth/auth_router")
const userRouter =  require('../routers_models/users/users_router')
const itemRouter = require('../routers_models/item/item_router')
const cateRouter = require("../routers_models/category/cate_router");
const user_itemRouter = require("../routers_models/user_item/user_item_router");

const server = express()



server.use(helmet())
server.use(express.json())
server.use(cors({origin: '*' }))  // may need to change this???


server.use('/api/auth', authRouter)
server.use('/api/user', userRouter)
server.use('/api/item', itemRouter)
server.use("/api/category", cateRouter)
server.use("/api/favorites", user_itemRouter)

server.get('/', (req, res) => {
    res.send('THERE IS FOOD OUT THERE! 🌽🥕')
})

module.exports = server