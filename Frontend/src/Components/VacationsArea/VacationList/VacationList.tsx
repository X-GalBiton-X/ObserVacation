import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsServices";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";
import { useIsAdmin } from "../../../Hooks/UseIsAdmin";
import { vacationsStore } from "../../../Redux/VacationsState";

const msInDay = 1000 * 60 * 60 * 24;
const getDateDayCount = (dateStr: string) => Math.floor(new Date(dateStr).getTime() / msInDay);
const sortVacations = (vacations: VacationModel[]) => vacations.sort((a, b) => {
    const aStart = getDateDayCount(a.fromDate);
    const bStart = getDateDayCount(b.fromDate);
    if (aStart === bStart) {
        const aEnd = getDateDayCount(a.untilDate);
        const bEnd = getDateDayCount(b.untilDate);
        return bEnd - aEnd;
    } else return bStart - aStart;
});

function VacationList(): JSX.Element {
    const isAdmin = useIsAdmin();

    // Vacations State:
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFollowingOnly, setIsFollowingOnly] = useState<boolean>();

    // AJAX Side Effect:
    useEffect(() => {

        const unsubscribe = vacationsStore.subscribe(() => {
            const state = vacationsStore.getState().vacations;
            setVacations(sortVacations(state.slice()));
        })

        // Get vacations from server:
        vacationsService.getAllVacations()
            .then((data) => {
                setVacations(sortVacations(data));
            })
            .catch(err => notifyService.error(err));

        return () => unsubscribe();
    }, []);

    const renderedVacations = isFollowingOnly ? vacations?.filter(vac => vac.isFollowing) : vacations; 
    const pagesCount = renderedVacations ? Math.ceil(renderedVacations.length / 10) : 1;

    return (
        <div className="VacationList">
            {isAdmin && (
                <NavLink className="addVacationButton" to="/vacations/new">➕</NavLink>
            )}
            {
                vacations.length === 0 
                ? <Loading />
                : (
                    <>
                        <label>Following Only<input type="checkbox" checked={isFollowingOnly} onChange={() => setIsFollowingOnly(!isFollowingOnly)} /></label>
                        <div className="VacationListCards">
                            {renderedVacations.slice(currentPage * 10, (currentPage + 1) * 10).map(p => <VacationCard key={p.id} vacation={p} />)}
                        </div>
                        <div className="paginationContainer">
                            <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>{'<'}</button>
                            <div>Page {currentPage + 1} / {pagesCount}</div>
                            <button disabled={currentPage === pagesCount - 1} onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</button>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default VacationList;
