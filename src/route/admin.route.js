const express = require('express');
const AdminController = require('../controller/admin.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.meddelware');

const router = express.Router();

router.post('/employees', verifyToken, verifyAdmin, AdminController.createEmployee);
router.get('/employees', verifyToken, verifyAdmin, AdminController.listEmployees);

module.exports = router;

