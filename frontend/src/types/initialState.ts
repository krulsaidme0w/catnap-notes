import { Note } from "./note";

export type InitialState = {
	savedNotes: Note[],
    
    noteTitle: string,
    noteText: string
};
