import Auth from "../components/Auth/Auth";

function AuthPage(): JSX.Element {
	return (
		<Auth 
            buttonLabel={"_"}
            pageTitle={"catnap"}
            buttonAvailable={false}
        />
	)
}

export default AuthPage;
