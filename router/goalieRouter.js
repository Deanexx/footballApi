const express = require("express");
const { get, create } = require("../controllers/goalieController")

const router = express.Router();


router
    .route('/get')
    .get(get);

router
    .route('/create')
    .post(create);

module.exports = router;