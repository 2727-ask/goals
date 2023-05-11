const express = require('express')
const http = require('http')
const cors = require('cors')
const { router } = require('./router/installation.route')

const app = express()





app.use(router)

app.use(cors({origin: 'http://localhost:4200'}));

const sslServer = http.createServer(
    app
)



sslServer.listen(3443, () => console.log('Western Union Secure server 🚀🔑 on port 3443'))


