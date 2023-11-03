const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;
const BookingSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
        ref: "user"

    },
    sid: {
        type: ObjectId,
        ref: "show"
    },
    tickets: {
        type: Number
    },
    price: {
        type: Number
    },
    total: {
        type: Number
    },
    mid: {
        type: ObjectId,
        ref: "movie"
    },
    seats: [{ type: String }],
    token: {
        type: String
    }


}, { timestamps: true })

const Booking = mongoose.model("booking", BookingSchema);
module.exports = Booking;