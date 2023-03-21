import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

export const userStateSlice = createSlice({
	name: "Users",
	initialState: initialState,
	reducers: {
		login(state, action: PayloadAction<string>) {
			state.authed = true;
			state.privateKey = action.payload;
		},
		logout(state) {
			state.authed = false;
			state.privateKey = "";
		}
    }
})
