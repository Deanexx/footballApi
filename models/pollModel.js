const { Schema, model} = require("mongoose");

const pollSchema = new Schema({
    poll: [{
        user: {
            _id: {
                type: String,
                required: true,
                unique: true
            },
            name: {
                type: String,
                required: true,
                unique: true
            }
        },
        cnt: {
            type: Number,
            default: 0
        }
    }]
})

module.exports = model('poll', pollSchema);