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
import Chat from '@/pages/Chat'
import Cart from '@/pages/Cart'
import Error404 from '@/pages/Error404'

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
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/course-builder" element={<CourseBuilder />} />

        <Route path='/chat' element={<Chat />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UserManagement />} />

        <Route path='*' element = {<Error404/>}/>

        
      </Routes>
    </div>
  )
}

export default App