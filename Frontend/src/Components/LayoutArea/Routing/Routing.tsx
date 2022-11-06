import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import Reports from "../../ReportsArea/Reports/Reports";
import PageNotFound from "../PageNotFound/PageNotFound";
import { useSelector } from "react-redux";
import "./Routing.css";

function Routing(): JSX.Element {
    const user = useSelector((state: any) => state.user);
    return (
        <div className="Routing">

            <Routes>
                {
                    !user 
                    ? (
                        <>
                            {/* Register */}
                            <Route path="/register" element={<Register />} />

                            {/* Login */}
                            <Route path="/login" element={<Login />} />
                            
                            {/* Default Route*/}
                            <Route path="/" element={<Navigate to="/login" />} />
                        </>
                    )
                    : (
                        <>
                            {/* Logout */}
                            <Route path="/logout" element={<Logout />} />

                            {/* Vacations */}
                            <Route path="/vacations" element={<VacationList />} />

                            {/* Add vacation */}
                            <Route path="/vacations/new" element={<AddVacation />} />

                            {/* Edit vacation */}
                            <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
                            
                            {/* Reports */}
                            <Route path="/reports" element={<Reports />} />

                            {/* Default Route*/}
                            <Route path="/" element={<Navigate to="/vacations" />} />
                        </>
                    )
                }

                {/* Page not found */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
