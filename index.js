const server = require('./api/server');

require("dotenv").config();

const port = process.env.PORT || 6022;

server.listen(port, function () {
    console.log(`\n 🍉🍇 Server passing on localhost:${port} \n`);
});