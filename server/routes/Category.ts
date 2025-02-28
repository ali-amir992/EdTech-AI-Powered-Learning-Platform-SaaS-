import { createCategory } from "@controllers/Category";
import { isAdmin, isAuthenticated } from "@middlewares/Auth";
import express from "express";

const router = express.Router();

router.post("/", isAuthenticated, isAdmin, createCategory);



export default router;


