const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const categoryRouter = require('./category')
const productRouter = require('./product')
const homeRouter = require('./home')
const cartRouter = require('./cart')

function route(app) {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json())
    app.use(cookieParser())

    app.use(session({
        secret: "my website",
        name: "ngotanan",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 24 * 30 }
    }))

    app.use('/', homeRouter)
    app.use('/cart', cartRouter)
    app.use('/category', categoryRouter)
    app.use('/product', productRouter)
}

module.exports = route