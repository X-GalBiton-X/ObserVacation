import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useIsAdmin } from '../../../Hooks/UseIsAdmin';

function Menu(): JSX.Element {
    const isAdmin = useIsAdmin();
    return (
        <div className="Menu">
            <NavLink to="/vacations">Vacations</NavLink>
            {isAdmin &&
                <NavLink to="/reports">Reports</NavLink>
            }
        </div>
    );
}

export default Menu;
