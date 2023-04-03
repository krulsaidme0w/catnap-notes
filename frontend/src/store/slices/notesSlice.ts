import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";
import { Note } from "../../types/note";

export const noteStateSlice = createSlice({
	name: "Notes",
	initialState: initialState,
	reducers: {
        createNote(state, action: PayloadAction<Note>) {
            state.savedNotes.unshift(action.payload);
		},
		editNoteContent(state, action: PayloadAction<Note>) {
			const {id, title, text} = action.payload;
			state.noteId = id;
			state.noteTitle = title;
			state.noteText = text;
		},
		deleteNote(state, action: PayloadAction<string>) {
			state.savedNotes = state.savedNotes.filter((note) => note.id !== action.payload);
		},
		deleteCurrentNote(state, action: PayloadAction<string>) {
			state.savedNotes = state.savedNotes.filter((note) => note.id !== action.payload);
		},
		updateNoteContent(state, action: PayloadAction<Note>) {
			const noteToUpdate = state.savedNotes.find((note) => note.id === action.payload.id)!;
			Object.assign(noteToUpdate, {
				title: action.payload.title.trim(),
				text: action.payload.text,
			});
		},
		noteDialogIsVisible(state, action: PayloadAction<boolean>) {
			state.isNoteDialogVisible = action.payload;
		},
		resetNoteContent(state) {
			state.noteId = ""
			state.noteTitle = ""
			state.noteText = ""
		},
		noteIsEmpty(state, action: PayloadAction<boolean>) {
			state.isNoteEmpty = action.payload;
		},
		setNoteTitle(state, action: PayloadAction<string>) {
			state.noteTitle = action.payload;
		},
		setNoteText(state, action: PayloadAction<string>) {
			state.noteText = action.payload;
		},
		noteIsNew(state, action: PayloadAction<boolean>) {
			state.isNoteNew = action.payload;
		},
		setSavedNotes(state, action: PayloadAction<Array<Note>>) {
			state.savedNotes = action.payload;
		},
    }
})
