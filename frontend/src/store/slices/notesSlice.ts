import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { testState } from "../testState/testState";
import { initialState } from "../initialState/initialState";
import { Note } from "../../types/note";

export const noteStateSlice = createSlice({
	name: "Notes",
	initialState: testState,
	reducers: {
        create(state, action: PayloadAction<string>) {
			const newNote: Note = {
				id: new Date().toISOString(),
				title: "",
				text: "",
			};
            state.savedNotes.unshift(newNote);
		},
    }
})
