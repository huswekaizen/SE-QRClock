// adminRoute.js
import express from "express";
import { createEmployee, editEmployee, deleteEmployee,
         employeeList
       } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/create-employee", createEmployee);

router.put("/edit-employee/:id", editEmployee);

router.delete("/delete-employee/:id", deleteEmployee);

router.get("/employee-list", employeeList);

export default router;
