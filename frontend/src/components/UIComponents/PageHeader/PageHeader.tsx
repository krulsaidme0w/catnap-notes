import { noteActions } from "../../../store/store";

import { useDispatch } from "react-redux";

import "./PageHeader.scss"

type Props = {
	buttonLabel: string
	pageTitle: string
	buttonAvailable: boolean
};

function PageHeader(props: Props): JSX.Element {
	const {
		buttonLabel,
		pageTitle,
		buttonAvailable,
	} = props;
	
	const dispatch = useDispatch();
	const buttonAction = () => {
		dispatch(noteActions.noteDialogIsVisible(true));
	}

	return (
		<header>
			<h1 className={`page-title`}>
				{pageTitle}
			</h1>
			{buttonAvailable && <button
				onClick={buttonAction}
				className={`comical-shadow-animated .create-note-btn`} >
				<span>
					{buttonLabel}
				</span>
			</button>}
		</header>
	);
}

export default PageHeader;
