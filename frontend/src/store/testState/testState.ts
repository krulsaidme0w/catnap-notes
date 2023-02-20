import { InitialState } from "../../types/initialState";
import { Note } from "../../types/note";

const generateRandomNote = (): Note => {
    const titles = ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing elit', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa'];
    const texts = ['Vivamus sagittis lacus', 'Maecenas ac metus\nasdasdsad\n\asdasdasd\nasdsadasd\nasdasd', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa', 'Morbi at eleifend est'];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    return {
      id: Math.random().toString(36).substring(7),
      title: randomTitle,
      text: randomText
    };
  };

export const testState: InitialState = {
	savedNotes: Array.from({ length: 100 }, generateRandomNote),
  currentID: "",
};
