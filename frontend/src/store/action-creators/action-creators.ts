import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState, noteActions } from "../store";

import { Note } from "../../types/note";
import { addNote, delNote, getAllNotes, updateNote } from "../../api/api";

type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

const {
	createNote,
	setSavedNotes,
	deleteCurrentNote,
	editNoteContent,
	updateNoteContent,
	deleteNote,
	noteDialogIsVisible,
	resetNoteContent,
	noteIsNew,
} = noteActions;

export function deleteNoteAction(id: string): AppThunk {
	return async (dispatch) => {
		try {
			delNote(id);
			dispatch(deleteNote(id));
		} catch (error) {
			console.error(error);
		}
	}
}

export function exitNoteDialog(): AppThunk {
	return async (dispatch, getState) => {
		if (getState().notes.isNoteNew && !getState().notes.isNoteEmpty) {
			try {
				const note = {
					"title": getState().notes.noteTitle,
					"content": getState().notes.noteText,
				}
				const response = await addNote(note)
				dispatch(createNote(response));
			} catch (error) {
				console.error(error);
			}
		} else if(!getState().notes.isNoteNew && !getState().notes.isNoteEmpty) {
			try {
				const note = {
					"id": getState().notes.noteId,
					"title": getState().notes.noteTitle,
					"content": getState().notes.noteText,
				}
				const response = await updateNote(note)
				dispatch(updateNoteContent(response));
			} catch (error) {
				console.error(error);
			}
		} else if(!getState().notes.isNoteNew && getState().notes.isNoteEmpty) {
			try {
				delNote(getState().notes.noteId);
				dispatch(deleteCurrentNote(getState().notes.noteId));
			} catch (error) {
				console.error(error);
			}
		}

		dispatch(resetNoteContent());
		dispatch(noteDialogIsVisible(false));
	}
}

export function exitNoteDialogAndDelete(): AppThunk {
	return (dispatch, getState) => {
		try {
			delNote(getState().notes.noteId);
			dispatch(deleteCurrentNote(getState().notes.noteId));
		} catch (error) {
			console.error(error);
		}
		dispatch(resetNoteContent());
		dispatch(noteDialogIsVisible(false));
	}
}

export function editNote(noteContent: Note): AppThunk {
	return (dispatch) => {
		dispatch(editNoteContent(noteContent));
		dispatch(noteDialogIsVisible(true));
		dispatch(noteIsNew(false));
	}
}

export function fetchInitData(): AppThunk {
	return async (dispatch) => {
		try {
			const notes = await getAllNotes();
			dispatch(setSavedNotes(notes));
		} catch (error) {
			console.error(error);
		}
	}
}
