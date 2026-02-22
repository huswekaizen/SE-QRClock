// adminRoute.js
import express from "express";
import { createEmployee, editEmployee, employeeList } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/create-employee", createEmployee);

router.put("/edit-employee/:id", editEmployee);

router.get("/employee-list", employeeList);

export default router;
