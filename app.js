var express = require('express')
var app = express()

// Load custom options
require('dotenv').config()

// Set default options
if (!process.env.dbpath) process.env.dbpath = 'db.json'
if (!process.env.dbwriteInterval) process.env.dbwriteInterval = '30'
if (!process.env.auth) process.env.auth = 'admin'

// Mount user routes
app.use('/',
    require('./src/routes/api.js')
)

// Mount admin routes
app.use('/admin',
    require('./src/routes/admin.js')
)

app.listen(process.env.PORT || 8989)
console.log('Listening on port', process.env.PORT || 8989)
