import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ACCOUNT_TYPE } from '@utils/constant'
import { toast } from 'react-hot-toast'
import { sendOTP } from '@services/operations/authAPI'
import { setSignupData } from "@redux/slices/authSlice"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react'

type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const password = watch("password")
    // const confirmPassword = watch("confirmPassword")

    const onSubmit = (data: FormValues) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        dispatch(setSignupData(data))
        dispatch(sendOTP(data.email, navigate) as any)

        reset()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                id="name"
                                placeholder="Enter name"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email format"
                                    }
                                })}
                                type="email"
                                id="email"
                                placeholder="Enter email address"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Account Type Dropdown */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                {...register("role", { required: "Role is required" })}
                                id="role"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value={ACCOUNT_TYPE.STUDENT}>Student</option>
                                <option value={ACCOUNT_TYPE.INSTRUCTOR}>Instructor</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create Password</label>
                            <div className="relative">
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400" /> : <AiOutlineEye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required",
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showConfirmPassword ? <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400" /> : <AiOutlineEye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignupForm
