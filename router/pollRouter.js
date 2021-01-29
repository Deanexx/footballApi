const express = require("express");
const { reg, getAll, weeklyVote, setCookie, setScore, checkUserForReg, resetPoll, createPolls, removeUserFromPoll } = require("../controllers/pollController")

const router = express.Router();

router
    .route('/getall')
    .get(getAll);


router
    .route('/weeklyVote')
    .post(checkUserForReg, weeklyVote);

router
    .route('/setScore')
    .post(setScore);

router
    .route('/resetPoll')
    .get(resetPoll);

router
    .route('/setCookie')
    .get(setCookie);

router
    .route('/createPolls')
    .get(createPolls);

router
    .route('/deleteFromPoll')
    .patch(removeUserFromPoll);

router
    .route('/reg')
    .post(checkUserForReg, reg);

module.exports = router;