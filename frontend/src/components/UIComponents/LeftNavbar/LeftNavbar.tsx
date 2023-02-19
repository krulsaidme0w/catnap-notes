import "./LeftNavbar.scss"

import Home from "../../../assets/icons/Home";
import HeartOutlined from "../../../assets/icons/HeartOutlined";

function LeftNavbar(): JSX.Element {
	return (
		<nav className={`navigation-buttons focus-home`}>
			<button title="Home"><Home/></button>
			<button title="Info"><HeartOutlined/></button>
		</nav>
	);
  }
  
  export default LeftNavbar;
