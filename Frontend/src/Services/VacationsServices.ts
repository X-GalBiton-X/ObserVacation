import axios from 'axios';
import FollowerModel from '../Models/FollowerModel';
import VacationModel from "../Models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import { authStore } from '../Redux/AuthState';
import config from '../Utils/Config';


interface FollowedVacationResponse {
    followedVacations: number;
}

interface FollowersCountResponse {
    vacationId: number;
    followersCount: number;
}

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;
        const user = authStore.getState().user;
        // If we have no vacations in global state - fetch them from server:
        if (vacations.length === 0) {
            const [vacationsResponse, followedResponse, followersCountResponse] = await Promise.all([
                await axios.get<VacationModel[]>(config.vacationsUrl),
                await axios.get<FollowedVacationResponse[]>(config.followersUrl + user.id),
                await axios.get<FollowersCountResponse[]>(config.followersUrl)
            ]);
            vacations = vacationsResponse.data;
            const followedVacationIds = followedResponse.data.map(fod => fod.followedVacations);
            const followCountMap = followersCountResponse.data.reduce<Record<string, number>>((all, curr) => {
                all[curr.vacationId] = curr.followersCount;
                return all;
            }, {})
            vacations = vacations.map(vacation => {
                const modifiedVacation = { ...vacation }
                if (followedVacationIds.includes(vacation.id)) {
                    modifiedVacation.isFollowing = true;    
                }
                modifiedVacation.followersCount = followCountMap[vacation.id] || 0;
                
                return modifiedVacation;
            })
            const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
            vacationsStore.dispatch(action)
        }

        return vacations;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        let vacation;
        let vacations = vacationsStore.getState().vacations;

        // If we have no vacations in global state - fetch given vacation from server:
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel>(config.vacationsUrl + id);
            vacation = response.data;
        }
        else {
            vacation = vacations.find(p => p.id === id);
        }

        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("image", vacation.image[0]);
        formData.append("fromDate", vacation.fromDate);
        formData.append("untilDate", vacation.untilDate);
        formData.append("price", vacation.price.toString());

        const response = await axios.post<VacationModel>(config.vacationsUrl, formData);
        const addedVacation = response.data;

        const action: VacationsAction = { type: VacationsActionType.AddVacation, payload: addedVacation };
        vacationsStore.dispatch(action);
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("image", vacation.image[0]);
        formData.append("fromDate", vacation.fromDate);
        formData.append("untilDate", vacation.untilDate);
        formData.append("price", vacation.price.toString());

        const response = await axios.put<VacationModel>(config.vacationsUrl + vacation.id, formData);
        const updatedVacation = response.data;

        const action: VacationsAction = { type: VacationsActionType.UpdateVacation, payload: updatedVacation };
        vacationsStore.dispatch(action);
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(config.vacationsUrl + id);

        const action: VacationsAction = { type: VacationsActionType.DeleteVacation, payload: id };
        vacationsStore.dispatch(action);
    }

    public async onFollowClick(follower: FollowerModel): Promise<void> {
        const response = await axios.put<FollowerModel>(config.followersUrl + "follow", follower);
        const follow = response.data;

        const action: VacationsAction = { type: VacationsActionType.FollowVacation, payload: { id: follower.vacationId } };
        vacationsStore.dispatch(action);
    }

    public async onUnfollowClick(follower: FollowerModel): Promise<void> {
        const response = await axios.put<FollowerModel>(config.followersUrl + "unfollow", follower);
        const unfollow = response.data;

        const action: VacationsAction = { type: VacationsActionType.UnfollowVacation, payload: { id: follower.vacationId } };
        vacationsStore.dispatch(action);
    }

}

const vacationsService = new VacationsService();

export default vacationsService;