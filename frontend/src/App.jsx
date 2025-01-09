import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"

import {useAuthStore} from "./store/useAuthStore"
import {useThemeStore} from "./store/useThemeStore"
import {Routes, Route, Navigate, data} from "react-router-dom"
import {useEffect} from "react"

import {Loader} from "lucide-react"

import {Toaster} from "react-hot-toast"


const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore()

  useEffect(() => {
    checkAuth()
  }
  , [checkAuth])

  console.log("authUser:", authUser)

  if(isCheckingAuth && !authUser) return(
    <div className="flex justify-center items-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )


  return (
    <div data-theme = {theme}>
      
    <Navbar />

    <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>

    <Toaster />

    </div>
  )
}

export default App