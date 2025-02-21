import express from "express";
import { connectDb } from "./db/connectDB.js";
import {routes as authRoutes} from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


const app = express()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser())


app.use("/auth", authRoutes)
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend","dist", "index.html"))
  })
}




app.listen(PORT, () => {
  connectDb()
  console.log('Server is running on port: ' + PORT);
})