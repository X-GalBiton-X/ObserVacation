import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {

        try {
            authService.logout();
            notifyService.success("Bye bye...")
            navigate("/");
        }
        catch(err: any) {
            notifyService.error(err);
        }

    }, [navigate]);

    return null;
}

export default Logout;
