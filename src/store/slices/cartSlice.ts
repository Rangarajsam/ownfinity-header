import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../config/generalConfig";
import { getAuthToken } from "../../utils/authUtils";
export const getCartCount = createAsyncThunk(
    "cart/count",
    async (_,{rejectWithValue, getState}) => {
        try {
            const state = getState() as any;
            const token = getAuthToken(state);
            if (!token) {
                throw new Error("No token found, user is not logged in.");
            }
            const response = await axios.get(
                `${API_URL}/cart/count`,  
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || "Failed to add to cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartCount: 0,
        loading: false,
        error: null as unknown | null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartCount.fulfilled, (state, action) => {
                state.loading = false;
                state.cartCount = action.payload.count;
            })
            .addCase(getCartCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as unknown;
            });
    },
});
export default cartSlice.reducer;