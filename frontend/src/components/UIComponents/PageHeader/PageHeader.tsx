import "./PageHeader.scss"

function PageHeader(): JSX.Element {
	const buttonClass = ".create-note-btn"
	const buttonLabel = "add new note"
	const pageTitle = "cat nap"

	return (
		<header>
			<h1 className={`page-title`}>
				{pageTitle}
			</h1>
			<button 
				className={`comical-shadow-animated ${buttonClass}`} >
				<span>
					{buttonLabel}
				</span>
			</button>
		</header>
	);
}

export default PageHeader;
