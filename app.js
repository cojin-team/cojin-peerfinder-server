var express = require('express')
var app = express()

app.use('/',
    require('./src/routes/api.js')
)

app.listen(process.env.PORT || 8989)
console.log('Listening on port', process.env.PORT || 8989)
