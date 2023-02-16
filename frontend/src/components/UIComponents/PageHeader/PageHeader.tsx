type Props = {};

function PageHeader(props: Props): JSX.Element {
	return (
		<div>
			<nav className="container-fluid">
				<ul>
				<li><a href="./" className="contrast"><strong>qNote</strong></a></li>
				</ul>
			</nav>
		</div>
	);
}

export default PageHeader;
