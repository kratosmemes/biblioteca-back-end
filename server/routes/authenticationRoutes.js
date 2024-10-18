const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/authenticationController');
const { VerifyDbStatus } = require('../middlewares/database_status_verify');

router.post('/login', [VerifyDbStatus] , userCtrl.loginFunction);
router.post('/register', [VerifyDbStatus] , userCtrl.registerFunction);

module.exports = router;