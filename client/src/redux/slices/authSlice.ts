import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    signupData: any | null;
    loading: boolean;
    token: string | null;
}

const initialState: AuthState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
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
    }
});

export const { setLoading, setSignupData, setToken } = authSlice.actions;
export default authSlice.reducer;
