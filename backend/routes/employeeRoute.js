// adminRoute.js
import express from "express";
import { createEmployee, editEmployee, deleteEmployee,
         employeeList, adminDashboard
       } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/create-employee", createEmployee);

router.put("/edit-employee/:id", editEmployee);

router.delete("/delete-employee/:id", deleteEmployee);

router.get("/employee-list", employeeList);
router.get("/admin-dashboard", adminDashboard);

export default router;
