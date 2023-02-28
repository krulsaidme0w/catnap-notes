import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Home from "../../../assets/icons/Home";
import HeartOutlined from "../../../assets/icons/HeartOutlined";

import "./LeftNavbar.scss"

function LeftNavbar(): JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();
	const [focusedPage, setFocusedPage] = useState("focus-home");
		
	const switchPageHandler = (page: string) => {
		navigate(`/${page}`);
	}

	useEffect(() => {
		setFocusedPage(`focus-${location.pathname.slice(1)}`);
	}, [location.pathname]);

	return (
		<nav className={`navigation-buttons ${focusedPage}`}>
			<button onClick={() => switchPageHandler("home")} title="Home"><Home/></button>
			<button onClick={() => switchPageHandler("info")} title="Info"><HeartOutlined/></button>
		</nav>
	);
  }
  
  export default LeftNavbar;
