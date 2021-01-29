const { Schema, model } = require("mongoose");

const pollsSchema = new Schema({
    poll: [{
        _id: String,
        cnt: {
            type: Number,
            default: 0
        },
        additionalPlayers: Number
    }],
    active: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = model('polls', pollsSchema);