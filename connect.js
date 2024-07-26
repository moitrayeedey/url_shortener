const mongoose = require("mongoose");

async function connectDB() {
    return mongoose.connect(`${process.env.MONGODB_URI}/short-url`);
}

module.exports = {connectDB};