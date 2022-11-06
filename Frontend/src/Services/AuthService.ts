import axios from 'axios';
import UserModel from "../Models/UserModel";
import CredentialsModel from '../Models/CredentialsModel';
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import config from '../Utils/Config';

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.authUrl + 'register', user);
        const token = response.data;
        const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.authUrl + 'login', credentials);
        const token = response.data;
        const action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    public logout(): void {
        const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }

}

const authService = new AuthService();

export default authService;