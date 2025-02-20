import { toast } from "react-hot-toast";
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
        token?: string;
        user?:any
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
        } catch (error: any) {
            console.error("SENDOTP API ERROR", error);
            toast.error(error.response.data.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

// Define signup parameters
interface SignupParams {
    role: string;
    name: string,
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

// Define login parameters

interface LoginParams {
    email: string;
    password: string;
    navigate: NavigateFunction;
    token?: string;
    user?: any; 
}



export function login({ email, password, navigate }: LoginParams) {
    return async (dispatch: Dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response: ApiResponse = await apiConnector({
                method: "POST",
                url: endpoints.LOGIN_API,
                bodyData: { email, password },
            });

            console.log("Login API response...", response);

            if (!response.data.success || !response.data.token || !response.data.user) {
                throw new Error(response.data.message || "Invalid response from server");
            }

            toast.success("Login successfully");
            dispatch(setToken(response.data.token));

            // ✅ Ensure token is stored as a string
            localStorage.setItem("token", JSON.stringify(response.data.token ?? ""));
            localStorage.setItem("user", JSON.stringify(response.data.user ?? {}));

            navigate("/my-profile");
        } catch (error: any) {
            console.error("Login API error...", error);
            toast.error(error.response?.data?.message || "Login Failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}



