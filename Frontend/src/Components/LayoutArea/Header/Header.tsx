import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useIsAdmin } from "../../../Hooks/UseIsAdmin";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {

    const isAdmin = useIsAdmin();

    return (
        <div className="Header">

            <AuthMenu />

            <Logo />

            <h1>ObserVacation</h1>

        </div>
    );
}

export default Header;
