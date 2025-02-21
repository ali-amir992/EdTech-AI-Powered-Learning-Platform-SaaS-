import toast from "react-hot-toast";
import { setLoading, setToken } from "@redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

// Define the expected shape of API responses
interface ApiResponse {
    data: {
        success: boolean;
        message?: string;
    };
}

// sendOTP function
export function sendOTP(email: string, navigate: NavigateFunction) {
    return async (dispatch: Dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response: ApiResponse = await apiConnector({
                method: "POST",
                url: endpoints.SENDOTP_API,
                bodyData: {
                    email,
                    checkUserPresent: true,
                },
            });

            console.log("SENDOTP API response...", response);
            console.log(response.data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email");
        } catch (error) {
            console.error("SENDOTP API ERROR", error);
            toast.error("Could not send OTP");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

// Define signup parameters
interface SignupParams {
    role: string;
    name:string,
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
    navigate: NavigateFunction;
}

// signup function
export function signup({
    role,
    name,
    email,
    password,
    confirmPassword,
    otp,
    navigate,
}: SignupParams) {
    return async (dispatch: Dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            console.log("Ye OTP ja raha hai frontend se", otp);
            const response: ApiResponse = await apiConnector(
                {
                    method: "POST",
                    url: endpoints.SIGNUP_API,
                    bodyData: {
                        role,
                        name,
                        email,
                        password,
                        confirmPassword,
                        otp,
                    }
                });

            console.log("SIGNUP API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.error("SIGNUP API ERROR....", error);
            toast.error("Signup Failed");
            navigate("/signup");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}
