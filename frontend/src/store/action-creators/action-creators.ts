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
	deleteEmptyNote,
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
		if (getState().noteReducer.isNoteNew && !getState().noteReducer.isNoteEmpty) {
			dispatch(createNote());
		} else if(!getState().noteReducer.isNoteNew && !getState().noteReducer.isNoteEmpty) {
			dispatch(updateNoteContent());
		} else if(!getState().noteReducer.isNoteNew && getState().noteReducer.isNoteEmpty) {
			dispatch(deleteEmptyNote());
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
