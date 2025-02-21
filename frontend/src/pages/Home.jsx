import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const { error, logout, isLoading} = useAuthStore();
  const navigate = useNavigate();
  const handleClick = async () =>{
    try {
      await logout();
      navigate('/login');
      toast.success("Loged out successfully")
      console.log("logged out");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h2>Home</h2>
      <motion.button onClick={handleClick} className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 hover:cursor-pointer"
          type="submit">
        {isLoading ? <Loader className="animate-spin max-auto" size={24}/> : "Logout"}
      </motion.button>
    </div>
  )
}
