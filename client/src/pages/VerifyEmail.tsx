import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, signup } from "../services/operations/authAPI";
import { BiArrowBack } from "react-icons/bi";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { RootState, AppDispatch } from "@redux/store";

const VerifyEmail: React.FC = () => {
    const { signupData, loading } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string>("");

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!signupData) return;

        const { name, email, password, confirmPassword, role } = signupData;

        dispatch(
            signup({
                role,
                name,
                email,
                password,
                confirmPassword,
                otp,
                navigate,
            })
        );
    };

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            {loading ? (
                <Spinner />
            ) : (
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Verify Email</h1>

                    <p className="text-gray-600 text-center mb-6">
                        A verification code has been sent to you. Enter the code below.
                    </p>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="flex justify-center">
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        placeholder="-"
                                        className="w-12 h-12 mx-1 text-center border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                )}
                                containerStyle="flex gap-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Verify Email
                        </button>
                    </form>

                    <div className="mt-6 flex justify-between">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                        >
                            <BiArrowBack className="mr-1" />
                            Back to Login
                        </Link>

                        <button
                            onClick={() => {
                                if (signupData && signupData.email) {
                                    dispatch(sendOTP(signupData.email, navigate));
                                }
                            }}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                        >
                            <PiClockCounterClockwiseBold className="mr-1" />
                            Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;