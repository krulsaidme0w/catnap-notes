import { Note } from "../../types/note";

import "./SavedNote.scss";

function SavedNote(props: Note): JSX.Element {
	const {
        title,
        text,
    } = props;

	return (
		<div className={`note`}>
			{title && (<h3 className="title">{title}</h3>)}
			<p className="text">{text}</p>
		</div>
	);
}

export default SavedNote;
