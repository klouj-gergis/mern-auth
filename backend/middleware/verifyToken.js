import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
      return res.status(401).json({ success: false, message: "User unauthorized"})
    }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!tokenDecoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token"});
    req.userId = tokenDecoded.userId;
    next();
  } catch (error) {
    console.log(`error in verifyToken ${error.message}`)
    return res.status(401).json({ success: false, message: error.message})
  }
}