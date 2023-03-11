import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";

import { noteStateSlice } from "./slices/notesSlice";
import { userStateSlice } from "./slices/userSlice";


const rootReducer = {
	notes: noteStateSlice.reducer,
  	user: userStateSlice.reducer,
};

const store = configureStore({
	reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export const noteActions = noteStateSlice.actions;
export const userActions = userStateSlice.actions;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>()

export default store;
