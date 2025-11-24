import { Router } from "express";

import { authenticateUser } from "../middlewares/auth.middleware";
import {
  createPost,
  getPosts,
  getUserPosts,
} from "../controllers/post.controller";

const router = Router();

router.post("/create", authenticateUser, createPost);
router.get("/user/:userId", authenticateUser, getUserPosts);
router.get("/getPosts", authenticateUser, getPosts);

export default router;
