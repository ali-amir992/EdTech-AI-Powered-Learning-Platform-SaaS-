import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    email: string;
    role: string;
    avatar?: string;
}

interface AuthState {
    signupData: any | null;
    loading: boolean;
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData(state, action: PayloadAction<any>) {
            state.signupData = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }
});

export const { setLoading, setSignupData, setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
