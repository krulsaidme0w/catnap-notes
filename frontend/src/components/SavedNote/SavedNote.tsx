import { useState } from "react";
import { useThunkDispatch } from "../../store/store";
import { deleteNoteAction } from "../../store/action-creators/action-creators";

import "./SavedNote.scss";
import Delete from "../../assets/icons/Delete"

type Props = {
	id: string,
	title: string,
	text: string,
	maxNoteTitleLength: number,
}

const longTitleEndingSymbol = "..."
function format(title: string, maxLen: number): string {
	if (title.length > maxLen) {
		title = title.slice(0, maxLen).trim().concat(longTitleEndingSymbol);
	}

	return title;
}

function SavedNote(props: Props): JSX.Element {
	const {
		id,
		title,
		text,
		maxNoteTitleLength,
    } = props;

	const thunkDispatch = useThunkDispatch();
	const deleteNote = (e: React.MouseEvent) => {
		e.preventDefault();
		thunkDispatch(deleteNoteAction(id));
	}

	const [showButton, setShowButton] = useState(false);
	return (
		<div 
		className={`note`}
		onMouseEnter={() => setShowButton(true)}
      	onMouseLeave={() => setShowButton(false)}>
			{format(title, maxNoteTitleLength) && (
			<h3 className="title">{format(title, maxNoteTitleLength)}</h3>)}
			<p className="text">{text}</p>
			{showButton && (
				<button className="delete_button" onClick={deleteNote}>
				<Delete/>
				</button>
			)}
		</div>
	);
}

export default SavedNote;
