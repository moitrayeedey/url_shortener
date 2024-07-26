const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortId: {
        type: String, 
        required: true,
        unique: true
    }, 
    redirectUrl: {
        type: String,
        required: true
    }, 
    visitedUrl: [{ timestamp: {type: Number}}]
}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;