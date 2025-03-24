import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import ProtectedRoute from "@/utils/ProtectedRoutes";
import Navbar from "@/components/common/Navbar";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Signup from "@/pages/Signup";
import VerifyEmail from "@/pages/VerifyEmail";
import CourseBuilder from "@/pages/CourseBuilder";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/components/dashboard/pages/UserManagement";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetails";
import Chat from "@/pages/Chat";
import Cart from "@/pages/Cart";
import Error404 from "@/pages/Error404";
import LandingPage from "@/pages/LandingPage";
import { Footer } from "@/components/common/footer";
import EnrolledCourses from "@/components/dashboard/pages/EnrolledCourses";
import EnrolledCoursesDetails from "@/pages/EnrolledCourseDetails";

const App = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = !!user; // True if user exists
  const userRole = user?.role || "Student"; // Default role as Student if not logged in

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />

        {/* Protected Routes */}
        <Route
          path="/course-builder"
          element={
            <ProtectedRoute
              element={<CourseBuilder />}
              isAuthenticated={isAuthenticated}
              requiredRole="Instructor"
              userRole={userRole}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/dashboard/courses"
          element={
            <ProtectedRoute
              element={<EnrolledCourses />}
              isAuthenticated={isAuthenticated}
              requiredRole="Student"
              userRole={userRole}
            />
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute
              element={<UserManagement />}
              isAuthenticated={isAuthenticated}
              requiredRole="Admin"
              userRole={userRole}
            />
          }
        />
        <Route path="/enrolledCourses/:courseId" element={<EnrolledCoursesDetails />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
        <Footer/>
    </div>
  );
};

export default App;
