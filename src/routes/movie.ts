import express from "express";
import controller from "@/controllers/movie";

const router = express.Router();

router.get("/movie/getByTitle/:title", controller.getByTitle);
router.get("/movie/getByImdbId/:imdbId", controller.getByImdbId);
router.get("/movie/getBySearch/:search", controller.getBySearch);

export default router