import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";
import { useEffect } from "react";

function useVerifyLoggedIn(): void {
    const navigate = useNavigate();
    useEffect(() => {
        const token = authStore.getState().token;
        if (!token) {
            notifyService.error("You must be logged in!");
            navigate("/login");
        }
    }, []);
}

export default useVerifyLoggedIn;