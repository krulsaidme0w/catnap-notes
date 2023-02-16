import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types/note";
import { initialState } from "../initialState/initialState";

export const noteStateSlice = createSlice({
	name: "Notes",
	initialState: initialState,
	reducers: {
        create(state, action: PayloadAction<string>) {
			const newNote: Note = {
				id: new Date().toISOString(),
				title: state.noteTitle.trim(),
				text: state.noteText
			};
            state.savedNotes.unshift(newNote);
		},
    }
})
