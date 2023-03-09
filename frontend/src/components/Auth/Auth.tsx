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
			
			<div className={`auth-form-container`}>
			<form className="auth-form">
				<div className="auth-form-content">
					<h3 className="auth-form-title">log in</h3>
					<div className="form-group mt-3">
						<label>private key</label>
						<input
						spellCheck={false}
						className="form-control mt-1"
						placeholder="private key"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button className={`comical-shadow-animated`}>
							<span className={`login`}>
								login
							</span>
						</button>
					</div>
					<p>
						
					</p>
				</div>
			</form>

				{/* <textarea
					placeholder="private key"
					spellCheck={false}
					className="key-text">
				</textarea>
				<button className={`comical-shadow-animated`}>
					<span className={`login`}>
						login
					</span>
				</button> */}
            </div>
		</Fragment>
	)
}

export default Auth;
