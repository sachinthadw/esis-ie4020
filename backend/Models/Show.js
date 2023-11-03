const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;
const ShowSchema = new mongoose.Schema({
    mid: {
        type: ObjectId,
        ref: "movie"
    },
    hid: {
        type: ObjectId,
        ref: "hall"
    },
    date: {
        type: String
    },
    time: {
        type: Number
    },
    seatbook: [{ type: String }],
    price: {
        type: Number
    }


}, { timestamps: true })

const Show = mongoose.model("show", ShowSchema);
module.exports = Show;