const mongoose = require('mongoose');
const schema = mongoose.Schema;
var ObjectId = require('bson').ObjectId;
const movieShema = new schema({

    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,

    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    area: [{ type: ObjectId, ref: 'category' }],
    rate: {
        type: Number
    },
    hallid: {
        type: ObjectId
    }


})

const Movie = mongoose.model("movie", movieShema);
module.exports = Movie;