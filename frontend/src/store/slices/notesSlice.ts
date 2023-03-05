import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";
import { Note } from "../../types/note";

export const noteStateSlice = createSlice({
	name: "Notes",
	initialState: initialState,
	reducers: {
        createNote(state) {
			const newNote: Note = {
				id: new Date().toISOString(),
				title: state.noteTitle,
				text: state.noteText,
			};
            state.savedNotes.unshift(newNote);
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
		deleteCurrentNote(state) {
			state.savedNotes = state.savedNotes.filter((note) => note.id !== state.noteId);
		},
		updateNoteContent(state) {
			const noteToUpdate = state.savedNotes.find((note) => note.id === state.noteId)!;
			Object.assign(noteToUpdate, {
				title: state.noteTitle.trim(),
				text: state.noteText,
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
    }
})
