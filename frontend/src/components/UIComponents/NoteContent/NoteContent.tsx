import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { noteActions, RootState } from "../../../store/store";

import "./NoteContent.scss";

function NoteContent(): JSX.Element {
	const { noteTitle, noteText } = useSelector((state: RootState) => state.notes);
	const dispatch = useDispatch();
	const noteTextArea = useRef<HTMLTextAreaElement>(null);

	const syncNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(noteActions.setNoteTitle(e.target.value));
	}

	const syncNoteText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(noteActions.setNoteText(e.target.value));
	}

	const enterTextArea = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter" || e.key === "NumpadEnter") {
			e.preventDefault();
			noteTextArea.current?.focus();
		}
	}

	useEffect(() => {
		if (noteTitle.trim() !== "" || noteText.trim() !== "") {
			dispatch(noteActions.noteIsEmpty(false));
		} else {
			dispatch(noteActions.noteIsEmpty(true));
		}
	}, [dispatch, noteTitle, noteText]);

    return (
        <div className="note-content">
			<div className="user-inputs">
				<input onChange={syncNoteTitle}
					onKeyDown={enterTextArea}
					type="text"
					value={noteTitle}
					placeholder="title"
					spellCheck={false}
					className="note-title"/>

				<textarea onChange={syncNoteText}
					ref={noteTextArea}
					value={noteText}
					placeholder="your note"
					spellCheck={false}
					className="note-text">
				</textarea>
			</div>
		</div>
    );
}

export default NoteContent;
