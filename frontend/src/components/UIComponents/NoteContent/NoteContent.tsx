import { useRef } from "react";

import "./NoteContent.scss";

type Props = {
	activePage: string,
};

function NoteContent(props: Props): JSX.Element {
    const {
		activePage
	} = props;
	const noteTextArea = useRef<HTMLTextAreaElement>(null);

	const enterTextArea = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter" || e.key === "NumpadEnter") {
			e.preventDefault();
			noteTextArea.current?.focus();
		}
	}

    return (
        <div className="note-content">
			<div className="user-inputs">
				<input
					onKeyDown={enterTextArea}
					type="text"
					placeholder="title"
					spellCheck={false}
					className="note-title"/>

				<textarea
					ref={noteTextArea}
					placeholder="your note"
					spellCheck={false}
					className="note-text">
				</textarea>
			</div>
		</div>
    );
}

export default NoteContent;
