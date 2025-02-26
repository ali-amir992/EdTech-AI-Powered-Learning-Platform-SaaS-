const BASE_URL = "http://localhost:5000/api/v1"

export const userEndpoints = {
    SENDOTP_API: BASE_URL + "/user/sendOTP",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/user/reset-password",
}

export const adminEndpoints = {
    GET_USERS_API: BASE_URL + "/admin/",  
}