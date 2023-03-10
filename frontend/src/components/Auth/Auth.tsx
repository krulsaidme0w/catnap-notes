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

	const register = (e: React.MouseEvent) => {
		e.preventDefault();
	}

	return (
		<Fragment>
			<PageHeader pageTitle={pageTitle}
				buttonLabel={buttonLabel}
				buttonAvailable={buttonAvailable}
			/>
			
			<div className={`auth-form-container`}>
				<form className="auth-form">
					<div className="auth-form-content">
						<h3 className="auth-form-title">welc0me back!</h3>
						<div className="form-group">
							<input
							type="password"
							spellCheck={false}
							className="form-control"
							placeholder="private key"
							/>
						</div>
						<div className="form-group">
							<button className={`comical-shadow-animated`}>
								<span className={`login`}>
									sign in
								</span>
							</button>
						</div>
						<div className="form-group">
							<p>
								no account? <a className="rising-background" 
								target="_blank" rel="noreferrer" 
								href="#" onClick={register}>sign up</a>
							</p>
						</div>
					</div>
				</form>
            </div>
		</Fragment>
	)
}

export default Auth;
