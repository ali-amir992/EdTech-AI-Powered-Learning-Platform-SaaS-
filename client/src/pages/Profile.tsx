import { useNavigate } from "react-router-dom"
import {logout} from '@services/operations/authAPI'
import { useAppDispatch } from "@redux/hooks/useAppDispatch";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4 tracking-tight">
          Profile
        </h1>
      </div>
      <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md">
        Logout
      </button>
    </div>
  );
}

export default Profile