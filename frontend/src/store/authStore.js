import { create } from "zustand";
import axios from "axios";



const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000/auth" : "/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticted:false,
  error: null,
  isLoading: false,
  isCheckAuth:true,

  signup: async (email, password, username) => {
    set({ isLoading: true, error:null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {email, password, username});
      set({ isLoading: false, user: response.data.user, error:null, isAuthenticted: true });
    } catch (error) {
      set({error: error.response.data.message || "Error signing up" , isLoading:false})
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({isLoading: true, error: null})
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {code: code})
      set({user: response.data.user, isAuthenticted: true, isLoading: false});
      console.log("ahlllaaaaaaaaaaaaaaaaaa", response.data)
      return response.data
    } catch (error) {
      set({error: error.response.data.message || "Error verifying the email", isLoading: false})
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticted: true, isCheckAuth: false })
    } catch (error) {
      set({ error: null, isCheckAuth: false, isAuthenticted: false})
    }
  },

  login: async (email, password) => {
    set({isLoading: true, error: null});
    try {
      const response = await axios.post(`${API_URL}/login`, {email, password});
      set({isLoading: false, user: response.data.user, isAuthenticted: true, error: null});
      return response
    } catch (error) {
      set({error: error.response.data.message || "Error in login" , isLoading:false})
      throw error
    }
  },

  forgotPassword: async (email) => {
    set({isLoading: true, error: null});
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {email});
      set({isLoading: false, error: null});
      return response
    }catch(error){
      set({error: error.response.data.message || "Error sending email" , isLoading:false})
      throw error
    }
  },

  resetPassword: async (password, token) => {
    set({isLoading: true, error: null});
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {password});
      set({isLoading: false, error: null});
      return response
    } catch (error) {
      set({error: error.response.data.message || "Error reseting your password" , isLoading:false})
      throw error
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      set({isLoading: false, isAuthenticted: true, error: null});
      return response
    } catch (error) {
      set({error: error.response.data.message || "Error in logout" , isLoading:false})
      throw error
    }
  }
}))