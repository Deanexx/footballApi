const footballersModel = require("../models/footballersModel")

exports.clearUser = async function(req, res, next){
    res.cookie("user", '', { expires: new Date(Date.now() - 1), encode: String });
    res.status(200).json({
        status: "success"
    })
}

exports.getAll = async function(req, res, next){
    const data = await footballersModel.find();

    res.status(200).json({
        status: "success",
        data
    })
}

exports.changeUser = async function(req, res, next){
    let user = req.cookies.user;
    user.name = req.body.name;

    await footballersModel.findByIdAndUpdate(user._id, { name: req.body.name })
    res.cookie("user", user, { expires: new Date(Date.now() + 100000 * 365 * 24 * 60 * 60), encode: String, httpOnly: false, path: "/" })

    res.status(200).json({
        status: "success"
    })
}