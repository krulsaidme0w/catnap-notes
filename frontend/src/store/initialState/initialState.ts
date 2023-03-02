import { InitialState } from "../../types/initialState";

export const initialState: InitialState = {
	savedNotes: [],
	currentID: "",
	isNoteDialogVisible: false,
	noteId: "",
	noteTitle: "",
	noteText: "",
	isNoteEmpty: true,
	isNoteNew: true,
};
