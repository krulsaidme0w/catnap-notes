import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { testState } from "../testState/testState";
import { initialState } from "../initialState/initialState";
import { Note } from "../../types/note";

export const noteStateSlice = createSlice({
	name: "Notes",
	initialState: testState,
	reducers: {
        createNote(state, action: PayloadAction<Note>) {
			const newNote: Note = {
				id: new Date().toISOString(),
				title: action.payload.title,
				text: action.payload.text,
			};
            state.savedNotes.unshift(newNote);
		},
		deleteNote(state, action: PayloadAction<string>) {
			state.savedNotes = state.savedNotes.filter((note) => note.id !== action.payload);
		},
    }
})
