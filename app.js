var express = require('express')
var app = express()

if (!process.env.dbpath) require('dotenv').config()

app.use('/',
    require('./src/routes/api.js')
)

app.listen(process.env.PORT || 8989)
console.log('Listening on port', process.env.PORT || 8989)
