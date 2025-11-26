import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware";
import {
  createComment,
  createCommentReply,
  getCommentsAndReply,
  toggleCommentLike,
  toggleReplyLike,
} from "../controllers/comment.controller";

const router = express.Router();

router.post("/create/:postId", authenticateUser, createComment);
router.post(
  "/create-comment-reply/:commentId",
  authenticateUser,
  createCommentReply
);

router.patch("/like-comment/:commentId", authenticateUser, toggleCommentLike);
router.patch("/like-reply/:replyId", authenticateUser, toggleReplyLike);

router.get("/get-comments/:postId", authenticateUser, getCommentsAndReply);

export default router;
