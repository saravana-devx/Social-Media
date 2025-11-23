import { Router } from "express";
import {
  updateProfile,
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
  deleteUser,
  updateProfileImage,
  getUserDetail,
  cancelFriendRequest,
  rejectFriendRequest,
  getSearchedProfile,
} from "../controllers/profile.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

router.patch("/update", authenticateUser, updateProfile);
router.delete("/delete", authenticateUser, deleteUser);
router.patch("/profile-image", authenticateUser, updateProfileImage);

router.get("/user/:userName", authenticateUser, getUserDetail);

router.get("/friends/:userId", authenticateUser, getFriends);

router.post("/friend-request/:friendId", authenticateUser, sendFriendRequest);
router.post("/accept-request/:requesterId", authenticateUser, acceptFriendRequest);
router.delete("/cancel-request/:targetUserId", authenticateUser, cancelFriendRequest); 
router.post("/reject-request/:requesterId",  authenticateUser, rejectFriendRequest); 
router.delete("/remove-friend/:friendId", authenticateUser, removeFriend);

router.get("/search-profile",authenticateUser,getSearchedProfile);

export default router;