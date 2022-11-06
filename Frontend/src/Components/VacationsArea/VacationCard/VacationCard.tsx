import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import { useIsAdmin } from "../../../Hooks/UseIsAdmin";
import vacationsService from "../../../Services/VacationsServices"
import { useSelector } from 'react-redux';
import FollowerModel from '../../../Models/FollowerModel'; 
import notifyService from "../../../Services/NotifyService";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    
    const isAdmin = useIsAdmin();
    const user = useSelector((state: any) => state.user);

    const followerModel: FollowerModel = {
        userId: user.id,
        vacationId: props.vacation.id
    };

    async function deleteVacation() {
        try {
            const iAmSure = window.confirm("Are you sure?");
            if (!iAmSure) return;
            await vacationsService.deleteVacation(props.vacation.id);
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationCard Box" style={{ backgroundImage: `url("http://localhost:3001/images/${props.vacation.imageName}")` }}>
            <div className="buttonsContainer">
                {isAdmin
                    ? (
                        <>
                            <NavLink to={`/vacations/edit/${props.vacation.id}`}>Edit</NavLink>
                            <button onClick={deleteVacation}>X</button>
                        </>
                    ) : props.vacation.isFollowing ? (
                        <button onClick={() => vacationsService.onUnfollowClick(followerModel)} className="followBtn">Unfollow</button>
                    ) : (
                        <button onClick={() => vacationsService.onFollowClick(followerModel)} className="followBtn">Follow</button>
                    )
                }
            </div>
            <div className="VacationCardLinkWrapper">
                <div>
                    {new Date(props.vacation.fromDate).toLocaleDateString()} - {new Date(props.vacation.untilDate).toLocaleDateString()} {/* Somehow need to display dates in DD/MM/YYYY format */}
                </div> <br />
                ${props.vacation.price} <br />
                <div className="followersCount">{props.vacation.followersCount}</div>
                <h4>{props.vacation.destination}</h4>
                {props.vacation.description}
            </div>
        </div>
    );
}

export default VacationCard;
