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
	deleteNote,
} = noteActions;

export function createNoteAction(note: Note): AppThunk {
	return (dispatch) => {
		dispatch(createNote(note))
	}
}

export function deleteNoteAction(id: string): AppThunk {
	return (dispatch) => {
		dispatch(deleteNote(id));
	}
}
