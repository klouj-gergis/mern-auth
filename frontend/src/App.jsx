import FloatingShape from "./components/FloatingShape"
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/authStore.js";
import { Children, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";


const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticted, user} = useAuthStore();
  if(isAuthenticted, user){
    return <Navigate to="/" replace />
  }
  return children;
}

const ProtectedRoutes = ({children}) => {
  const { isAuthenticted, user} = useAuthStore();
  if(!isAuthenticted){
    return <Navigate to="/login" replace />
  }
  return children;
}

function App() {
  const { isCheckAuth, checkAuth, isAuthenticted, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth])



  if(isCheckAuth){
    return <LoadingSpinner />
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-700 to-emerald-900 flex items-center relative overflow-hidden justify-center">
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/verify-email" element={
          <RedirectAuthenticatedUser>
            <VerifyEmail />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/reset-password/:token" element={
          <RedirectAuthenticatedUser>
            <ResetPassword />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/forgot-password" element={
          <RedirectAuthenticatedUser>
            <ForgotPassword />
          </RedirectAuthenticatedUser>
        } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
