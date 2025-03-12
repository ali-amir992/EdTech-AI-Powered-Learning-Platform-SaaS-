import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import Signup from '@/pages/Signup'
import VerifyEmail from '@/pages/VerifyEmail'
import { Route, Routes } from 'react-router-dom'
import CourseBuilder from '@/pages/CourseBuilder'
import Dashboard from '@/pages/Dashboard'
import UserManagement from '@/components/dashboard/pages/UserManagement'
import Home from '@/pages/Home'
import CourseDetail from '@/pages/CourseDetails'
import { Navbar } from '@/components/common/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:courseId" element={<CourseDetail />} />
        <Route path="/course-builder" element={<CourseBuilder />} />



        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UserManagement />} />
      </Routes>
    </div>
  )
}

export default App