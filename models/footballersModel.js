const mongoose = require("mongoose");

const footballersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('footballers', footballersSchema);