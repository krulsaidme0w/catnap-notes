import React, { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState, userActions } from "../../store/store";

import PageHeader from "../UIComponents/PageHeader/PageHeader";
import sha256 from "../../utils/crypto";
import { loginUser, registerUser } from "../../api/api";
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

	const authed = useSelector((state: RootState) => state.user).authed;

	const dispatch = useDispatch();

	const [isLoginForm, setIsLoginForm] = useState(true);
	const switchToRegisterForm = (e: React.MouseEvent) => {
		e.preventDefault();
		setReqError("")
		setIsLoginForm(false);
	}

	const switchToLoginForm = (e: React.MouseEvent) => {
		e.preventDefault();
		setReqError("")
		setIsLoginForm(true);
	}

	const [registerFormValue, setRegisterFormValue] = useState("my private key");
	const [loginFormValue, setLoginFormValue] = useState("");
	const [reqError, setReqError] = useState("");
	
	const syncLoginFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginFormValue(e.target.value);
	}

	const generateKey = (e: React.MouseEvent) => {
		e.preventDefault();
		const now = new Date();
		const randStr = (Math.random() + 1).toString(36).substring(9);
		const privateKey = sha256(String(now) + randStr);
		setRegisterFormValue(privateKey);
		navigator.clipboard.writeText(privateKey);
	}

	const register = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			await registerUser(sha256(sha256(registerFormValue)));
			setIsLoginForm(true);
			setLoginFormValue(registerFormValue);
			setReqError("")
		} catch (error) {
			console.error(error);
			setReqError("auth-error")
		}
	}
	
	const login = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			await loginUser(sha256(sha256(loginFormValue)));
			dispatch(userActions.login(loginFormValue));
			setReqError("")
		} catch (error) {
			console.error(error);
			setReqError("auth-error")
		}
	}
	
	return (
		<Fragment>
			{authed && <Navigate to="/home" replace={true}/>}

			<PageHeader pageTitle={pageTitle}
				buttonLabel={buttonLabel}
				buttonAvailable={buttonAvailable}
			/>
			
			{isLoginForm && (
				<div className={`auth-form-container`}>
					<form className="auth-form">
						<div className="auth-form-content">
							<h3 className="auth-form-title">welc0me back!</h3>
							<div className="form-group">
								<input
								type="password"
								spellCheck={false}
								onChange={syncLoginFormValue}
								value={loginFormValue}
								className={`form-control ${reqError}`}
								placeholder="private key"
								/>
							</div>
							<div className="form-group">
								<button onClick={login} className={`comical-shadow-animated login-button`}>
									<span className={`button-span`}>
										sign in
									</span>
								</button>
							</div>
							<div className="form-group">
								<p>
									no account? <a className="rising-background" 
									target="_blank" rel="noreferrer" 
									href="/#" onClick={switchToRegisterForm}>sign up</a>
								</p>
							</div>
						</div>
					</form>
				</div>
			)}

			{!isLoginForm && (
				<div className={`auth-form-container`}>
					<form className="auth-form">
						<div className="auth-form-content">
							<h3 className="auth-form-title">sign up!</h3>
							<div className="form-group">
								<input
								type="text"
								disabled={true}
								spellCheck={false}
								value={registerFormValue}
								readOnly={true}
								className={`form-control-register ${reqError}`}
								placeholder="generate your key"
								/>
								<button onClick={generateKey} className={`comical-shadow-animated generate-key-button`}>
									<span className={`button-span`}>
										gen/copy
									</span>
								</button>
							</div>
							<div className="form-group">
								<button onClick={register} className={`comical-shadow-animated login-button`}>
									<span className={`button-span`}>
										sign up
									</span>
								</button>
							</div>
							<div className="form-group">
								<p>
									have account? <a className="rising-background" 
									target="_blank" rel="noreferrer" 
									href="/#" onClick={switchToLoginForm}>sign in</a>
								</p>
							</div>
						</div>
					</form>
				</div>
			)}
		</Fragment>
	)
}

export default Auth;
