import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState, useThunkDispatch } from "../../store/store";

import { exitNoteDialog } from "../../store/action-creators/action-creators";

import NoteContent from "../UIComponents/NoteContent/NoteContent";

import ArrowLeft from "../../assets/icons/ArrowLeft"

import "./NoteDialog.scss";

type Props = {
	activePage: string,
};

function NoteDialog(props: Props): JSX.Element {
	const {
		activePage
 	} = props;

	 const {
		isNoteDialogVisible,
	} = useSelector((state: RootState) => state.noteReducer);

	const thunkDispatch = useThunkDispatch();

	const closeNoteDialog = (e: React.MouseEvent) => {
		e.preventDefault();
		thunkDispatch(exitNoteDialog());
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
				<button onClick={closeNoteDialog} className="save-button"><ArrowLeft/></button>
			</div>

			<NoteContent />
		</form>
	);
}

export default NoteDialog;
