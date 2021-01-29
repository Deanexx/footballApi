const express = require("express");
const { getAll, changeUser, clearUser } = require("../controllers/footballersController")

const router = express.Router();


router
    .route('/clearUser')
    .get(clearUser);

router
    .route('/changeUser')
    .post(changeUser);

router
    .route('/getAll')
    .get(getAll);



module.exports = router;