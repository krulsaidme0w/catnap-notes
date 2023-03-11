import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState, noteActions } from "../store";

import { Note } from "../../types/note";

type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

const {
	createNote,
	deleteCurrentNote,
	editNoteContent,
	updateNoteContent,
	deleteNote,
	noteDialogIsVisible,
	resetNoteContent,
	noteIsNew,
} = noteActions;

export function createNoteAction(): AppThunk {
	return (dispatch) => {
		dispatch(createNote())
	}
}

export function deleteNoteAction(id: string): AppThunk {
	return (dispatch) => {
		dispatch(deleteNote(id));
	}
}

export function exitNoteDialog(): AppThunk {
	return (dispatch, getState) => {
		if (getState().notes.isNoteNew && !getState().notes.isNoteEmpty) {
			dispatch(createNote());
		} else if(!getState().notes.isNoteNew && !getState().notes.isNoteEmpty) {
			dispatch(updateNoteContent());
		} else if(!getState().notes.isNoteNew && getState().notes.isNoteEmpty) {
			dispatch(deleteCurrentNote());
		}

		dispatch(resetNoteContent());
		dispatch(noteDialogIsVisible(false));
	}
}

export function exitNoteDialogAndDelete(): AppThunk {
	return (dispatch) => {
		dispatch(deleteCurrentNote());
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
