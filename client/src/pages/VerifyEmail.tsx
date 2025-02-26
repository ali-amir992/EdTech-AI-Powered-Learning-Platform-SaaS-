import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, signup } from "../services/operations/authAPI";
import { BiArrowBack } from "react-icons/bi";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { RootState, AppDispatch } from "@/redux/store";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"; // Shadcn UI InputOTP

const VerifyEmail: React.FC = () => {
    const { signupData, loading } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // react-hook-form setup
    const { handleSubmit, setValue, watch } = useForm<{ otp: string }>({
        defaultValues: { otp: "" },
    });

    const otp = watch("otp"); // Get OTP value

    // Redirect if no signup data is found
    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);

    // Handle OTP form submission
    const onSubmit = (data: { otp: string }) => {
        if (!signupData) return;

        const { name, email, password, confirmPassword, role } = signupData;

        dispatch(
            signup({
                role,
                name,
                email,
                password,
                confirmPassword,
                otp: data.otp,
                navigate,
            })
        );
    };

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">

            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Verify Email</h1>

                <p className="text-gray-600 text-center mb-6">
                    A verification code has been sent to you. Enter the code below.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setValue("otp", value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <Button type="submit" className="w-full">
                        Verify Email
                    </Button>
                </form>

                <div className="mt-6 flex justify-between">
                    <Link
                        to="/login"
                        className="text-sm font-medium flex items-center"
                    >
                        <BiArrowBack className="mr-1" />
                        Back to Login
                    </Link>

                    <Button
                        variant="ghost"
                        onClick={() => {
                            if (signupData?.email) {
                                dispatch(sendOTP(signupData.email, navigate));
                            }
                        }}
                        className="text-sm font-medium flex items-center"
                    >
                        <PiClockCounterClockwiseBold className="mr-1" />
                        Resend it
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default VerifyEmail;