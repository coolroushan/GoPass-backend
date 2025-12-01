const express = require('express');
const router = express.Router();
const { registerVisitor, getVisitors, scanVisitor, getVisitorStats } = require('../controllers/visitorController');

router.post('/', registerVisitor);
router.get('/', getVisitors);
router.post('/scan', scanVisitor);
router.get('/stats', getVisitorStats);

module.exports = router;