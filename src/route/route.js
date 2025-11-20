const controller = require('../controller/controller');
const express = require('express');
const router = express.Router();
const { verifyToken, verifyManager } = require('../middleware/auth.meddelware');



router.post("/add-team-employee", verifyToken, verifyManager, controller.addEmployeeToTeam)

router.get("/team-employees", verifyToken, verifyManager, controller.getTeamEmployees);

router.post("/add-attendance", verifyToken, controller.addEmployeeAttendance);

router.get("/view-attendance", verifyToken, controller.viewAttendance);

router.get("/view-own-attendance", verifyToken, controller.viewOwnAttendance);

module.exports = router;