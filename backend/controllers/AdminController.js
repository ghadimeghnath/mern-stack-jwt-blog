import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

//   /api/auth/admin/login
export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password) {
      return res.json({ success: false, meassage: "Missing details" });
    }
    const isMatch = process.env.ADMIN_PASSWORD === password;
    if (isMatch && email == process.env.ADMIN_EMAIL) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ success: true, message: "Admin Verified" });
    } else {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//  /api/auth/admin/is-admin
export const isAdmin = async (req, res) => {
  try {
    const { email } = req;
    if (!email) {
      return res.json({ success: false, message: "Invalid Details" });
    }
    const admin = await User.findOne({ email }).select("-password");

    return res.json({ success: true, admin: admin });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//  /api/auth/admin/logout
export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.json({ success: true, message: "Logged out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
