import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { noteStateSlice } from "./slices/notesSlice";

const store = configureStore({
	reducer: {
		noteReducer: noteStateSlice.reducer
	}	
})

export type RootState = ReturnType<typeof store.getState>;
export const noteActions = noteStateSlice.actions;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>()

export default store;
