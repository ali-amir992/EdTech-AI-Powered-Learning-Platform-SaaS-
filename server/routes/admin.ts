import express from "express";
import { createUser, updateUser, deleteUser, getUsers } from "@controllers/Admin";
import { isAdmin, isAuthenticated } from "@middlewares/Auth";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, getUsers); 
router.post("/createUser", isAuthenticated, isAdmin, createUser); 
router.put("/:id", isAuthenticated, isAdmin, updateUser);
router.delete("/:id", isAuthenticated, isAdmin, deleteUser); 

export default router;
