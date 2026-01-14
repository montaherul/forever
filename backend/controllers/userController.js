import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersJsonPath = path.join(__dirname, "../data/users.json");

// ✅ Helper function to sync users (minus password) to JSON for debugging/seed
const syncUsersToJSON = async () => {
  try {
    const users = await userModel.find({}).lean();
    const usersForJSON = users.map((user) => ({
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      jobTitle: user.jobTitle,
      company: user.company,
      bio: user.bio,
      location: user.location,
      phone: user.phone,
      address: user.address,
      deliveryStreet: user.deliveryStreet,
      deliveryCity: user.deliveryCity,
      deliveryState: user.deliveryState,
      deliveryZipcode: user.deliveryZipcode,
      deliveryCountry: user.deliveryCountry,
      deliveryAltLabel: user.deliveryAltLabel,
      deliveryAltStreet: user.deliveryAltStreet,
      deliveryAltCity: user.deliveryAltCity,
      deliveryAltState: user.deliveryAltState,
      deliveryAltZipcode: user.deliveryAltZipcode,
      deliveryAltCountry: user.deliveryAltCountry,
      website: user.website,
      linkedin: user.linkedin,
      github: user.github,
      twitter: user.twitter,
      totalOrders: user.totalOrders,
      accountVerified: user.accountVerified,
      verificationDate: user.verificationDate,
      lastUpdated: user.lastUpdated,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    fs.writeFileSync(usersJsonPath, JSON.stringify(usersForJSON, null, 2));
  } catch (error) {
    console.error("Error syncing users to JSON:", error);
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    } else {
      const token = createToken(user._id);
      res.json({ success: true, token: token });
    }
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      profileImage: profileImage || "", // Save profile picture from OAuth
    });
    const user = await newUser.save();

    // ✅ Sync to JSON file
    await syncUsersToJSON();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      address,
      profileImage,
      jobTitle,
      company,
      bio,
      location,
      website,
      linkedin,
      github,
      twitter,
      deliveryStreet,
      deliveryCity,
      deliveryState,
      deliveryZipcode,
      deliveryCountry,
      deliveryAltLabel,
      deliveryAltStreet,
      deliveryAltCity,
      deliveryAltState,
      deliveryAltZipcode,
      deliveryAltCountry,
    } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (profileImage) updateData.profileImage = profileImage;
    if (jobTitle) updateData.jobTitle = jobTitle;
    if (company) updateData.company = company;
    if (bio) updateData.bio = bio;
    if (location) updateData.location = location;
    if (website) updateData.website = website;
    if (linkedin) updateData.linkedin = linkedin;
    if (github) updateData.github = github;
    if (twitter) updateData.twitter = twitter;
    if (deliveryStreet) updateData.deliveryStreet = deliveryStreet;
    if (deliveryCity) updateData.deliveryCity = deliveryCity;
    if (deliveryState) updateData.deliveryState = deliveryState;
    if (deliveryZipcode) updateData.deliveryZipcode = deliveryZipcode;
    if (deliveryCountry) updateData.deliveryCountry = deliveryCountry;
    if (deliveryAltLabel || deliveryAltLabel === "")
      updateData.deliveryAltLabel = deliveryAltLabel;
    if (deliveryAltStreet) updateData.deliveryAltStreet = deliveryAltStreet;
    if (deliveryAltCity) updateData.deliveryAltCity = deliveryAltCity;
    if (deliveryAltState) updateData.deliveryAltState = deliveryAltState;
    if (deliveryAltZipcode) updateData.deliveryAltZipcode = deliveryAltZipcode;
    if (deliveryAltCountry) updateData.deliveryAltCountry = deliveryAltCountry;
    updateData.lastUpdated = new Date();

    const user = await userModel
      .findByIdAndUpdate(userId, updateData, { new: true })
      .select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Sync to JSON file
    await syncUsersToJSON();

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Wishlist toggle
const toggleWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!productId) {
      return res.json({ success: false, message: "productId required" });
    }
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const exists = user.wishlist.includes(productId);
    const update = exists
      ? { $pull: { wishlist: productId } }
      : { $addToSet: { wishlist: productId } };

    const updated = await userModel.findByIdAndUpdate(userId, update, {
      new: true,
    });
    res.json({
      success: true,
      wishlist: updated.wishlist,
      action: exists ? "removed" : "added",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("wishlist");
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, wishlist: user.wishlist || [] });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Compare toggle
const toggleCompare = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!productId) {
      return res.json({ success: false, message: "productId required" });
    }
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const exists = user.compareList.includes(productId);
    const update = exists
      ? { $pull: { compareList: productId } }
      : { $addToSet: { compareList: productId } };

    const updated = await userModel.findByIdAndUpdate(userId, update, {
      new: true,
    });
    res.json({
      success: true,
      compareList: updated.compareList,
      action: exists ? "removed" : "added",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getCompare = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("compareList");
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, compareList: user.compareList || [] });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  toggleWishlist,
  getWishlist,
  toggleCompare,
  getCompare,
};
