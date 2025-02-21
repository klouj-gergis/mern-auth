import { useState } from "react"
import { Mail, Lock, Loader } from "lucide-react"
import Input from "../components/input"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, error, login, isLoading} = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
      toast.success("Login Successful")
    } catch (error) {
      toast.error("Faild to login")
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

      
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Welcome Back</h2>
      <form onSubmit={handleLogin}>
        <Input icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500 font-semibod mt-2">{error}</p>}
        <Link to="/forgot-password" className="text-green-400 hover:underline">Forgot password?</Link>
        <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 hover:cursor-pointer"
          type="submit"
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24}/> : "Login"}
          </motion.button>
      </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400 text-center">
          Don't have an account?{' '} 
          <Link to={"/signup"} className="text-green-400 hover:underline">
          Sign up
          </Link>

        </p>
      </div>
    </motion.div>
  )
}
