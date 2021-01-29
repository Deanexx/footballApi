const goalie = require("../models/goalieModel")

exports.get = async function(req, res, next){
    let data = await goalie.findOne({__v : 0});
    res.status(200).json({
        status: "success",
        data
    })
}

exports.create = async function(req, res, next){
    let created = await goalie.create({ all: {"Eldarushka": 1}})
    res.status(201).json({
        status: "success",
        data: created
    })
}