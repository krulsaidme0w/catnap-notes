import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Home from "../../../assets/icons/Home";
import HeartOutlined from "../../../assets/icons/HeartOutlined";

import "./LeftNavbar.scss"
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/store";
import Logout from "../../../assets/icons/Logout";

function LeftNavbar(): JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();
	const [focusedPage, setFocusedPage] = useState("focus-home");
	const [enabled, setEnabled] = useState(true);
		
	const switchPageHandler = (page: string) => {
		navigate(`/${page}`);
	}
	
	const dispatch = useDispatch();
	const logout = () => {
		dispatch(userActions.logout());
	}

	useEffect(() => {
		setFocusedPage(`focus-${location.pathname.slice(1)}`);
	}, [location.pathname]);

	useEffect(() => {
		if(location.pathname.slice(1) === "auth") {
			setEnabled(false);

		} else {
			setEnabled(true);
		}
	}, [location.pathname]);

	return (
		<Fragment>
			{enabled && (
				<nav className={`navigation-buttons ${focusedPage}`}>
					<button onClick={() => switchPageHandler("home")} title="Home"><Home/></button>
					<button onClick={() => switchPageHandler("info")} title="Info"><HeartOutlined/></button>
					<button onClick={() => logout()} title="Logout"><Logout/></button>
				</nav>
			)}
		</Fragment>
	);
  }
  
  export default LeftNavbar;
