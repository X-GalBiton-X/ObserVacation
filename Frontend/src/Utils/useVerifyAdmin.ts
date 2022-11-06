import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";
import RoleModel from "../Models/RoleModel";
import { useEffect } from "react";

function useVerifyAdmin(): void {
    const navigate = useNavigate()
    useEffect(() => {
        const token = authStore.getState().token;
        if (!token) {
            notifyService.error("You must be logged in!");
            navigate("/login");
            return;
        }
        const role = authStore.getState().user?.role;
        if (role !== RoleModel.Admin) {
            notifyService.error("Access denied!");
            navigate("/");
        }
    }, [navigate]);
}

export default useVerifyAdmin;