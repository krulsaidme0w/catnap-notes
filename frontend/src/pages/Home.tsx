import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import BaseComponent from "../components/BaseComponent/BaseComponent";

function HomePage(): JSX.Element {
	const notes = useSelector((state: RootState) => state.notes.savedNotes);

	return (
		<BaseComponent
			activePage="home"
			notes={notes}
			notesAvailable={true}
			buttonLabel={"add note"}
			pageTitle={"catnap"}
			buttonAvailable={true}
		/>
	)
}

export default HomePage;
