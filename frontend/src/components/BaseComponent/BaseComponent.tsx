import { Fragment } from "react";

import PageHeader from "../UIComponents/PageHeader/PageHeader";
import SavedNote from "../SavedNote/SavedNote";

import { Note } from "../../types/note";

import "./BaseComponent.scss";


type Props = {
	notes: Note[]
};

function BaseComponent(props: Props): JSX.Element {
	const {
		notes,
	} = props;

	const notesAvailable = notes.length != 0
	const noNotesInfo = "no notes"

	return (
		<Fragment>
			<PageHeader/>

			{notesAvailable && (
				<div className="notes">
					{notes.map((note) => (
						<SavedNote key={note.id}
							id={note.id}
							title={note.title}
							text={note.text}
						/>
					))}
				</div>
			)}

			{!notesAvailable && (
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
