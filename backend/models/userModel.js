import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  lastLoginDate: {
    type: Date,
    default: Date.now()
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordTokenExpireAt: Date,
  verificationToken: String,
  verificationTokenExpireAt: Date
}, {timestamps: true});

export const User = mongoose.model("user", userSchema);