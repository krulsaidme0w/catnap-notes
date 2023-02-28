import { Note } from "./note";

export type InitialState = {
	savedNotes: Note[],
	currentID: string,
	isNoteDialogVisible: boolean,
};
