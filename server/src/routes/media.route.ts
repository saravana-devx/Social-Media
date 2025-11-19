import express from "express";
import { getUploadSignature, saveMedia } from "../controllers/media.controller";

const router = express.Router();

router.get("/signature", getUploadSignature);
router.post("/save", saveMedia);

export default router;
