import BaseComponent from "../components/BaseComponent/BaseComponent";

function InfoPage(): JSX.Element {
	return (
		<BaseComponent
			activePage="info"
            notes={[]}
            notesAvailable={false}
            buttonLabel={"add note"}
			pageTitle={"info"}
            buttonAvailable={false}
		/>
	)
}

export default InfoPage;
