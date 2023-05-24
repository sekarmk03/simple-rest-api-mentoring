const express = require('express');
const router = express.Router();
const c = require('../controllers/student');

router.get('/students/', c.index);
router.get('/students/:id', c.show);
router.post('/students/', c.create);
router.put('/students/:id', c.update);
router.delete('/students/:id', c.delete);

module.exports = router;