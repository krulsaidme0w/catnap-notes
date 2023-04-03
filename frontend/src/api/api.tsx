import { Note } from "../types/note";


export const registerUser = async (privateKey: string) => {
  console.log(process.env.BASE_URL);
  const response = await fetch(`http://localhost:8080/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: privateKey }),
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
};

export const loginUser = async (privateKey: string) => {
  const response = await fetch(`http://localhost:8080/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: privateKey }),
  });
  if (!response.ok) {
    throw new Error('Failed to login user');
  } else {
    localStorage.setItem('authToken', privateKey);
  }
};

export type AddNoteReq = {
	title: string,
	content: string
};

export const addNote = async (note: AddNoteReq): Promise<Note> => {
  const token = localStorage.getItem('authToken')
  if (token == null) {
    throw new Error('Bad auth token');
  }

  const response = await fetch(`http://localhost:8080/note/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ 
      'title': note.title,
      'content': note.content,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to add note');
  }

  const jsonNote = await response.json();
  const parsedNote: Note = {
    id: jsonNote.id,
    title: jsonNote.title,
    text: jsonNote.content
  };

  return parsedNote;
};

export type UpdateNoteReq = {
  id: string,
	title: string,
	content: string
};

export const updateNote = async (note: UpdateNoteReq): Promise<Note> => {
  const token = localStorage.getItem('authToken')
  if (token == null) {
    throw new Error('Bad auth token');
  }

  const response = await fetch(`http://localhost:8080/note/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      'id': note.id,
      'title': note.title,
      'content': note.content,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update note');
  }

  const jsonNote = await response.json();
  const parsedNote: Note = {
    id: jsonNote.id,
    title: jsonNote.title,
    text: jsonNote.content
  };
  
  return parsedNote;
};

export const delNote = async (id: String) => {
  const token = localStorage.getItem('authToken')
  if (token == null) {
    throw new Error('Bad auth token');
  }

  const response = await fetch(`http://localhost:8080/note/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ "id": id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
  
  return;
};

export const getAllNotes = async () => {
  const token = localStorage.getItem('authToken')
  if (token == null) {
    throw new Error('Bad auth token');
  }

  const response = await fetch(`http://localhost:8080/note/get_all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get all note');
  }
  
  const jsonNotes = await response.json();
  const parsedNotes: Note[] = jsonNotes.map((jsonNote: any) => ({
    id: jsonNote.id,
    title: jsonNote.title,
    text: jsonNote.content
  }));

  return parsedNotes;
};

