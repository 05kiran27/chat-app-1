const express = require('express');
const router = express.Router();

const { protectRoute } = require('../middleware/protectRoute');
const { getUserForSidebar } = require('../Controller/userController');

router.get('/',protectRoute, getUserForSidebar);

module.exports = router;