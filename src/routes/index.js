
// const RedisStore = require('connect-redis')
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
    // app.set('trust proxy', 1);

    app.use(session({
        secret: "my website",
        name: "ngotanan",
        resave: true,
        // store: new RedisStore(),
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 24 * 30 }
    }))
    // app.use(function (req, res, next) {
    //     if (!req.session) {
    //         return next(new Error('Oh no'))
    //     }
    //     next() 
    // });

    app.use('/', homeRouter)
    app.use('/cart', cartRouter)
    app.use('/category', categoryRouter)
    app.use('/product', productRouter)
}

module.exports = route