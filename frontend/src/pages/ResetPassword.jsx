import Input from "../components/Input.jsx";
import { Lock, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore.js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


export default function ResetPassword() {
  const {isLoading, error, resetPassword} = useAuthStore()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()
  const comparePasswords = (password, confirmPassword) => {
    if (password === confirmPassword) return true
    return false
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const match = comparePasswords();
    if(!match){
      return alert('Passwords do not match')
    }

    try {
      await resetPassword(password, token);
      toast.success("Password reset successfully")
      navigate("/")
    } catch (error) {
      toast.error("Faild to reset password");
      console.log(error)
    }
  }
  return (
    <motion.div
      initial={{y: 20, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.5}}
      className="max-w-md w-full bg-gray-800/50  backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <Input placeholder="New password" type="password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="Confirm New password" type="password" icon={Lock} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          {error && <p className="text-red-500 font-semibod mt-2">{error}</p>}
          <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 hover:cursor-pointer"
          type="submit"
          disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24}/> : "Reset"}
          </motion.button>
        </form>
      </div>
    </motion.div>
    
  )
}
