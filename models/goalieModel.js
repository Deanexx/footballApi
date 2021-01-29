const mongoose = require("mongoose");

const goalieModel = new mongoose.Schema({
    all: {
        type: Object
    }
})

module.exports = mongoose.model('goalie', goalieModel);