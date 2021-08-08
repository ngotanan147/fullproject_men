require('dotenv').config()
const express = require('express')
const path = require('path')
const route = require('./src/routes')
const handlebars = require('express-handlebars')
const db = require('./src/config/db')
db.connect()
const app = express()
route(app)
const port = process.env.PORT || 3000

// app.use(express.urlencoded({ extended: false }))

//Static config
app.use(express.static(path.join(__dirname, 'src', 'public')))
//

//Handlebars setup
app.engine('hbs', handlebars({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))
//

app.listen(port, () => {
    console.log('listening on port: ' + port)
})