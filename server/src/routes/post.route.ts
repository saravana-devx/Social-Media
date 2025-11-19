import { Router } from "express";

import { authenticateUser } from "../middlewares/auth.middleware";
import { createPost, getUserPosts } from "../controllers/post.controller";

const router = Router();

router.post("/create/:mediaId", authenticateUser, createPost);
router.get("/user/:userId", authenticateUser, getUserPosts);

export default router;