const RoleController = require('../controller/role.controller');
const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth.meddelware');

router.post('/assign-role', verifyToken, verifyAdmin, RoleController.assignRole);

module.exports = router;