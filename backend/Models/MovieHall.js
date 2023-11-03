const mongoose = require('mongoose');
const schema = mongoose.Schema;
var ObjectId = require('bson').ObjectId;
const HallShema = new schema({

    name: {
        type: String,
        required: true
    },
    rows: {
        type: Number,

    },
    cols: {
        type: Number
    },
    seats: [{ type: String }],
    rate: {
        type: Number
    }


})

const Hall = mongoose.model("hall", HallShema);
module.exports = Hall;