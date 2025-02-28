import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import Signup from '@/pages/Signup'
import VerifyEmail from '@/pages/VerifyEmail'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import UserManagement from '@/components/dashboard/pages/UserManagement'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile/>} />


        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/users" element = {<UserManagement />} />
      </Routes>
    </div>
  )
}

export default App