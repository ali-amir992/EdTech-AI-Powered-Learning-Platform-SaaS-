import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types";


interface AuthState {
    signupData: any | null;
    loading: boolean;
    token: string | null;
    user: IUser | null;
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
        setUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
        },
        // logout(state) {
        //     state.token = null;
        //     state.user = null;
        //     (resetCart);
        //     localStorage.removeItem("token");
        //     localStorage.removeItem("user");
        // }
    }
});

export const { setLoading, setSignupData, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
