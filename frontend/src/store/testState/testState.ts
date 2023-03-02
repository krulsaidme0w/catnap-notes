import { InitialState } from "../../types/initialState";
import { Note } from "../../types/note";

const generateRandomNote = (): Note => {
    const titles = ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing elit'];
    const texts = ['Vivamus sagittis lacus', 'Maecenas ac metus', 'Morbi at eleifend est'];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    return {
      id: Math.random().toString(36).substring(7),
      title: randomTitle,
      text: randomText
    };
  };

export const testState: InitialState = {
	savedNotes: Array.from({ length: 10 }, generateRandomNote),
  currentID: "",
  isNoteDialogVisible: false,
  noteId: "",
  noteTitle: "",
	noteText: "",
	isNoteEmpty: true,
  isNoteNew: true,
};
