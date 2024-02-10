import express from "express";
import controller from "@/controllers/user";

const router = express.Router();

router.post("/user/signup", controller.signup);
router.post("/user/login", controller.login);

export default router