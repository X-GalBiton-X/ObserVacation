import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation,
    ClearVacations,
    FollowVacation,
    UnfollowVacation
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.id === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
        case VacationsActionType.ClearVacations:
            newState.vacations = [];
            break;
        case VacationsActionType.FollowVacation:
            const indexToFollow = newState.vacations.findIndex(v => v.id === action.payload.id);
            if (indexToFollow !== -1) {
                newState.vacations[indexToFollow] = {
                    ...newState.vacations[indexToFollow],
                    isFollowing: true,
                    followersCount: newState.vacations[indexToFollow].followersCount + 1
                };
            }
            break;
        case VacationsActionType.UnfollowVacation:
            const indexToUnfollow = newState.vacations.findIndex(v => v.id === action.payload.id);
            if (indexToUnfollow !== -1) {
                newState.vacations[indexToUnfollow] = {
                    ...newState.vacations[indexToUnfollow],
                    isFollowing: false,
                    followersCount: newState.vacations[indexToUnfollow].followersCount - 1
                };
            }
            break;
    }

    return newState;
}

export const vacationsStore = createStore(vacationsReducer);