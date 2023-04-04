import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import { useThunkDispatch, userActions } from "../../store/store";

import { RootState } from "../../store/store";

import { exitNoteDialog, fetchInitData } from "../../store/action-creators/action-creators";

import PageHeader from "../UIComponents/PageHeader/PageHeader";
import SavedNote from "../SavedNote/SavedNote";
import NoteDialog from "../NoteDialog/NoteDialog";

import { Note } from "../../types/note";

import "./BaseComponent.scss";
import { loginUser } from "../../api/api";


type Props = {
	activePage: string
	notes: Note[]
	notesAvailable: boolean
	buttonLabel: string
	pageTitle: string
	buttonAvailable: boolean
};

function BaseComponent(props: Props): JSX.Element {
	const authed = useSelector((state: RootState) => state.user).authed;
	const isNoteDialogVisible = useSelector((state: RootState) => state.notes).isNoteDialogVisible;


	const {
		activePage,
		notes,
		notesAvailable,
		buttonLabel,
		pageTitle,
		buttonAvailable,
	} = props;

	const thunkDispatch = useThunkDispatch();
	const dispatch = useDispatch();
	
	const noNotesInfo = "no notes"
	const maxNoteTitleLength = 30

	const [overlayClasses, setOverlayClasses] = useState("");
	const [blurOverlayClasses, setBlurOverlayClasses] = useState("");
	const [authedChecked, setAuthedChecked] = useState(false);
	const [dataIsFetched, setDataIsFetched] = useState(false);

	const closeNoteDialog = () => {
		thunkDispatch(exitNoteDialog());
	}

	useEffect(() => {
		if (isNoteDialogVisible) {
			setOverlayClasses("overlay-visible");
		} else {
			setOverlayClasses("");
		}
	}, [isNoteDialogVisible]);

	useEffect(() => {
		if (isNoteDialogVisible) {
			setBlurOverlayClasses(`blur-visible`);				
		} else {
			setBlurOverlayClasses("");
		}
	}, [isNoteDialogVisible]);

	if (!authedChecked) {
		setAuthedChecked(true);
		const authToken = localStorage.getItem('authToken');
		if (authToken != null) {
			loginUser(authToken);
			dispatch(userActions.login(authToken));
		}
	}

	if (!dataIsFetched) {
		setDataIsFetched(true);
		thunkDispatch(fetchInitData());
	}

	return (
		<Fragment>
			{!authed && <Navigate to="/auth" replace={true}/>}

			<PageHeader pageTitle={pageTitle}
				buttonLabel={buttonLabel}
				buttonAvailable={buttonAvailable}
			/>

			<div className={`overlay ${overlayClasses}`} onClick={closeNoteDialog}></div>
			<div className={`background-blur ${blurOverlayClasses}`}></div>
			
			<NoteDialog activePage={activePage}/>

			{notesAvailable && (
				<div className="notes">
					{notes.map((note) => (
						<SavedNote key={note.id}
							id={note.id}
							title={note.title}
							text={note.text}
							maxNoteTitleLength={maxNoteTitleLength}
						/>
					))}
				</div>
			)}

			{notes.length === 0 && notesAvailable && (
				<div className="notes-unavailable">
					<span>
						<h2>{noNotesInfo}</h2>
					</span>
				</div>
			)}

		</Fragment>
	)
}

export default BaseComponent;
