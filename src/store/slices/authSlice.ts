import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/generalConfig";
import api from "../../utils/axios";
import { getAuthToken } from "../../utils/authUtils";
import { get } from "http";

const loadUserFromStorage = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    return null;
};



export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, {rejectWithValue, getState}) => {
        try {
            const state = getState() as any;
            const token = getAuthToken(state);
            if (!token) {
                throw new Error("No token found, user is not logged in.");
            }
            const response = await axios.post(`${API_URL}/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        }
        catch (error:any) {
            return rejectWithValue(error.response || "Failed to logout");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user:loadUserFromStorage(),
        loading:false,
        error: null as string | null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            localStorage.removeItem("user");
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string | null;
        });
    }
});

export default authSlice.reducer;