const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.STR_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("Database connected!!!")
    } catch {

    }

}

module.exports = { connect }