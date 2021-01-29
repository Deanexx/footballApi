const footballersModel = require("../models/footballersModel")
const pollsModel = require("../models/pollsModel")

exports.getAll = async function(req, res, next){
    let all = await pollsModel.find();

    res.status(200).json({
        status: "success",
        all
    })
}

exports.reg = async function(req, res, next){
    res.status(201).json({
        status: "success",
        data: req.body.errorMessage
    })
}

exports.checkUserForReg = async function(req, res, next){
    let user = req.cookies.user;
    const data = req.body;
    console.log(user);

    try{
        if(!("user" in req.cookies))  // if no cookie in browser
            user = await footballersModel.create(data);
    }
    catch(error){ // if error with creating new user then ...

        if(error.code === 11000) { //if user with this name exist
            user = await footballersModel.findOne({ name: data.name }) // then getting data for this user
            req.body.errorMessage = "Person with this name exists in main table. If you are sure this name relates to you in data base then no actions required. If no, then clear yourself on a main page and create a new name!"
        }
        else throw new Error ("Error with creating new User") // internal error
    }
    req.body.user = user;
    req.body.user.additionalPlayers = data.additionalPlayers;     // adding additional players if any
    res.cookie("user", user, { expires: new Date(Date.now() + 1000000 * 365 * 24 * 60 * 60), encode: String,  httpOnly: false}) //setting cookie with new User or lost user or resetting cookie
    next();
}

exports.weeklyVote = async function (req, res, next){
    const user = req.body.user;

    if(!(await pollsModel.findOne({ active: true, "poll._id": user._id })))
        var data = await pollsModel.findOneAndUpdate({ active: true }, { $push:{
                poll: { _id: user._id, additionalPlayers: user.additionalPlayers, cnt: 0 }
            }
    }, { new: true })
    res.status(200).json({
        status: "success",
        data
    })
}

exports.setCookie = function(req, res, next){
    res.cookie("name", "Eldar", { expires: new Date(Date.now() + 100000 * 365 * 24 * 60 * 60), httpOnly: false})
    res.status(200).json({status: "good"})
}

exports.resetPoll = async function(req, res, next){
    try{
        await pollsModel.findOneAndUpdate( { active: true }, { active: false });

        await pollsModel.create(
            {
                poll: [],
                active: true
            }
        );
    }
    catch(error){
        throw new Error("Something went bad");
    }

    res.status(201).json({
        status: "success"
    })

}

exports.createPolls = async function(req, res, next){
    await pollsModel.create(
        {
            poll: [],
            active: true
        }
    );

    res.status(200).json({
        status: "success"
    })
}

exports.removeUserFromPoll = async function(req, res, next){
    // console.log(req.cookies.user._id)
    const data = await pollsModel.findOneAndUpdate( { active: true },
{
        $pull:
            {
                poll: { _id: req.cookies.user._id }
            }
    }, { new: true})

    res.status(200).json({
        status: "success",
        data
    })
}

exports.setScore = async function(req, res, next){
    const {activePollID, scores} = req.body;

    let { poll } = await pollsModel.findOne({ active: true });

    for(let id_user in scores){
        poll.forEach(el => {
            if(id_user === el._id)
                el.cnt += scores[id_user]
        })
    }

    try{
        var result = await pollsModel.findOneAndUpdate( { active: true }, { poll }, { new: true} );
        }
    catch(error){
        if(error)
            res.status(400).json({
                status: "fail",
                message: "Pleas try it again"
            })
    }
    res.cookie("voted", activePollID, { expires: new Date(Date.now() + 1000000 * 365 * 24 * 60 * 60), encode: String, httpOnly: false })
    res.status(200).json({
        status: "success",
        data: result
    })
}