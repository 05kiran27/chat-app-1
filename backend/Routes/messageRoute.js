const express = require('express');

const router = express.Router();

const {sendMessage, getMessage} = require('../Controller/messageController');
const {protectRoute} = require('../middleware/protectRoute');


router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessage);

module.exports = router;