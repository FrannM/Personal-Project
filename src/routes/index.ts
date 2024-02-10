import express from "express";
import user from "@/routes/user";
import movie from "@/routes/movie";



const router = express.Router();

router.use(user)
router.use(movie)

export default router