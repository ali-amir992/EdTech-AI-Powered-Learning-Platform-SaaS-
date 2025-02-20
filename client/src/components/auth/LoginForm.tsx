import React, { useState } from "react";
import { useAppDispatch } from "@redux/hooks"; // Correctly typed dispatch
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "@services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // ✅ Use correctly typed dispatch
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
        navigate,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex w-full flex-col gap-y-4">
      <label className="w-full">
        <div className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </div>
        <input
          type="email"
          placeholder="Enter email address"
          {...register("email", { required: "Email is required" })}
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </label>

      <label className="relative w-full">
        <div className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter the Password"
          {...register("password", { required: "Password is required" })}
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer text-richblack-5 opacity-80 text-[24px]"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </label>

      <Link to="/forgot-password">
        <p className="mt-1 ml-auto max-w-max text-sm text-blue-100">Forgot Password</p>
      </Link>

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
