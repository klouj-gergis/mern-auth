import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendLoginEmail, sendForgotPasswordEmail, sendPasswordResetSuccessful } from "../mailTrap/emails.js"



export const signup = async (req, res) => {
    const { email, password, username } = req.body;
  try {  
    if(!email || !password || !username){
      console.log("error")
      throw new Error("All fields are required!")
    }

    const userExits = await User.findOne({email})
    if(userExits){
      
      return res.status(400).json({success: false, message:"user already exits!"})
    }
    

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000
    })

    await user.save();

    // jwt 

    generateTokenAndSetCookie(res, user._id);
    sendVerificationEmail(user.email, verificationToken)

    res.status(201).json({success: true, message: "user created successfully"});
    
  } catch (error) {
    return res.status(400).json({success: false, message: error.message})
  }
}

export const verifyEmail = async (req, res) => {

  const { code } = req.body

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpireAt: {$gt: Date.now()}
    })

    if(!user){
      return res.status(400).json({success: false, message: "invalid code or expired verification code"})
    }

    user.isVerified = true
    user.verificationToken = null
    user.verificationTokenExpireAt = null
    await user.save()
    await sendWelcomeEmail(user.email, user.username)
    
    return res.status(200).json({success: true, message: "email verified successfully", user: user})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success: false, message: "invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "invalid email or password"});
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLoginDate = new Date();

    await user.save();
    sendLoginEmail(email, user.username);
    return res.status(200).json({ success: true, message: "Logged in successfully"})

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message})
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "logged out successfully"});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success: false, message: error.message})
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({success: false, message: "invalid email"});
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour


    user.resetPasswordToken = resetToken
    user.resetPasswordTokenExpireAt = resetTokenExpireAt

    await user.save();
    await sendForgotPasswordEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    return res.status(200).json({ success: true, message: "Email sent successfully"});
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({success: false, message: error.message})
  }
}


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: { $gt: Date.now() }
    })

  if(!user){
    return res.status(400).json({success: false, message: "invalid or expired token"})
  }

  // update password

  const hashedPassword = await bcrypt.hash(password, 12)
  user.password = hashedPassword
  user.resetPasswordToken = undefined
  user.resetPasswordTokenExpireAt = undefined
  await user.save()
  sendPasswordResetSuccessful(user.email)
  return res.status(200).json({success: true, message: "Password updated successfully"})

  } catch (error) {
    console.error(error.message)
    return res.status(500).json({success: false, message: error.message})
  }
}

export const checkAuth = async (req, res) => {
 try {
  const user = await User.findById(req.userId).select("-password");
  if(!user){
    return res.status(404).json({success: false, message: "User not found"})
  }

  return res.status(200).json({ success: true, user})
 } catch (error) {
  console.log(`error in checkAuth ${error.message}`);
  return res.status(400).json({success: false, message: error.message})
 }
}