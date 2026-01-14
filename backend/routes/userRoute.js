import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  toggleWishlist,
  getWishlist,
  toggleCompare,
  getCompare,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/profile", authUser, getUserProfile);
userRouter.post("/profile/update", authUser, updateUserProfile);
userRouter.post("/wishlist/toggle", authUser, toggleWishlist);
userRouter.post("/wishlist/list", authUser, getWishlist);
userRouter.post("/compare/toggle", authUser, toggleCompare);
userRouter.post("/compare/list", authUser, getCompare);

export default userRouter;
