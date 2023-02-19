import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BaseComponent from "../components/BaseComponent/BaseComponent";

function HomePage(): JSX.Element {
	const notes = useSelector((state: RootState) => state.noteReducer.savedNotes);

	return (
		<BaseComponent
			notes={notes}
		/>
	)
}

export default HomePage;
