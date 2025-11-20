const model = require('../model/model');

const Controller = {
    addEmployeeToTeam: async (req, res) => {
        try {
            const { manager_id, Employee_id } = req.body;
            if (!manager_id || !Employee_id) {
                return res.status(400).json({
                    success: false,
                    message: 'manager_id and Employee_id are required.',
                });
            }
            const result = await model.addEmployeeTeam(manager_id, Employee_id);
            console.log("result", result);
            if (result?.message === 'Manager Not Found') {
                return res.status(404).json({
                    success: false,
                    message: result.message,
                });
            }
            if (result?.message === 'Only  Manager can add employee to team!') {
                return res.status(404).json({
                    success: false,
                    message: result.message,
                });
            }

            if (result?.message === 'Employee not found') {
                return res.status(404).json({
                    success: false,
                    message: result.message,
                });
            }

            if (result?.message === 'Employee is already in your team !') {
                return res.status(400).json({
                    success: false,
                    message: result.message,
                });
            }

            res.status(200).json({
                success: true,
                message: result?.message || 'Employee added to team successfully.',
            });
        } catch (error) {
            console.error('Error in addEmployeeToTeam:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    getTeamEmployees: async (req, res) => {
        try {
            const manager_id = req.user.userId;
            console.log("manager_id", manager_id);
            const result = await model.getTeamEmployees(manager_id);

            if (result?.status === "error") {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: "Team employees fetched successfully.",
                data: result
            });

        } catch (error) {
            console.error('Error in getTeamEmployees:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    addEmployeeAttendance: async (req, res) => {

        try {
            const { employee_id, date, status } = req.body;
            const requesterRole = (req.user.role || '').toLowerCase();

            if (!['manager', 'employee'].includes(requesterRole)) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Only Managers or Employees can mark attendance.'
                });
            }

            if (!date || !status) {
                return res.status(400).json({
                    success: false,
                    message: 'date and status are required.',
                });
            }

            const targetEmployeeId = req.user.userId;

            if (requesterRole === 'manager' && employee_id && Number(employee_id) !== targetEmployeeId) {
                return res.status(403).json({
                    success: false,
                    message: 'Managers can only mark their own attendance.'
                });
            }

            if (requesterRole === 'employee' && employee_id && Number(employee_id) !== targetEmployeeId) {
                return res.status(403).json({
                    success: false,
                    message: 'Employees can only mark their own attendance.'
                });
            }

            const result = await model.AddEmployeeAttendance(targetEmployeeId, date, status);
            console.log("result", result);

            if (result?.status === "error") {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            res.status(200).json({
                success: true,
                message: result?.message || 'Attendance added successfully.',
            });
        } catch (error) {
            console.error('Error in addEmployeeAttendance:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    viewAttendance: async (req, res) => {
        try {
            const viewer_id = req.user.userId;
            console.log("viewer_id", viewer_id);
            const result = await model.ViewAttendance(viewer_id);
            if (result?.status === "error") {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true,
                message: "Attendance records fetched successfully.",
                data: result
            });
        } catch (error) {
            console.error('Error in viewAttendance:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    viewOwnAttendance: async (req, res) => {
        try {
            const employee_id = req.user.userId;
            console.log("employee_id", employee_id);
            const result = await model.ViewOwnAttendance(employee_id);
            if (result?.status === "error") {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true,
                message: "Own attendance records fetched successfully.",
                data: result
            });
        } catch (error) {
            console.error('Error in viewOwnAttendance:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = Controller;
