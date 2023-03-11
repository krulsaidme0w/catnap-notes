import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState, useThunkDispatch } from "../../store/store";

import { exitNoteDialog, exitNoteDialogAndDelete } from "../../store/action-creators/action-creators";

import NoteContent from "../UIComponents/NoteContent/NoteContent";

import ArrowLeft from "../../assets/icons/ArrowLeft"
import Delete from "../../assets/icons/Delete"

import "./NoteDialog.scss";

type Props = {
	activePage: string,
};

function NoteDialog(props: Props): JSX.Element {
	const {
		isNoteDialogVisible,
	} = useSelector((state: RootState) => state.notes);

	const thunkDispatch = useThunkDispatch();

	const closeNoteDialog = (e: React.MouseEvent) => {
		e.preventDefault();
		thunkDispatch(exitNoteDialog());
	}

	const deleteNote = (e: React.MouseEvent) => {
		e.preventDefault();
		thunkDispatch(exitNoteDialogAndDelete());
	}

	const [noteDialogClasses, setNoteDialogClasses] = useState("");

	useEffect(() => {
		if (isNoteDialogVisible) {
			setNoteDialogClasses(`note-dialog-visible dark glacial`);
		} else {
			setNoteDialogClasses("");
		}
	}, [isNoteDialogVisible]);

	return (
		<form className={`note-dialog ${noteDialogClasses}`}>
			<div className="action-buttons">
				<button onClick={closeNoteDialog} className="close-button"><ArrowLeft/></button>
				<button onClick={deleteNote} className="delete_button"><Delete/></button>
			</div>

			<NoteContent />
		</form>
	);
}

export default NoteDialog;
