import { Fragment } from "react";

import PageHeader from "../UIComponents/PageHeader/PageHeader";

import "./Auth.scss";


type Props = {
	buttonLabel: string
	pageTitle: string
	buttonAvailable: boolean
};

function Auth(props: Props): JSX.Element {
	const {
		buttonLabel,
		pageTitle,
		buttonAvailable,
	} = props;

	return (
		<Fragment>
			<PageHeader pageTitle={pageTitle}
				buttonLabel={buttonLabel}
				buttonAvailable={buttonAvailable}
			/>

			<div>
                form
            </div>
		</Fragment>
	)
}

export default Auth;
