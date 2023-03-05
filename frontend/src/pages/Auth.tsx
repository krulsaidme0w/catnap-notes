import Auth from "../components/Auth/Auth";

function AuthPage(): JSX.Element {
	return (
		<Auth 
            buttonLabel={"_"}
            pageTitle={"catnap auth"}
            buttonAvailable={false}
        />
	)
}

export default AuthPage;
