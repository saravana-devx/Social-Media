import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware";
import {
  getSessions,
  deleteSession,
  logoutAllExceptCurrent,
} from "../controllers/session.controller";

const router = Router();

router.get("/sessions", authenticateUser, getSessions);
router.delete("/sessions/:sessionId", authenticateUser, deleteSession);
router.post(
  "/sessions/logout-all-except-current",
  authenticateUser,
  logoutAllExceptCurrent
);

export default router;
