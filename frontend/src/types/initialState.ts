import { Note } from "./note";

export type InitialState = {
	savedNotes: Note[],
	currentID: string,
	isNoteDialogVisible: boolean,
	noteId: string,
	noteTitle: string,
	noteText: string,
	isNoteEmpty: boolean,
	isNoteNew: boolean,
};
