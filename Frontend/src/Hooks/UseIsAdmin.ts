import { useSelector } from 'react-redux';
import RoleModel from '../Models/RoleModel';

export function useIsAdmin(): boolean {
    const user = useSelector((state: any) => state.user);
    return user && user.role === RoleModel.Admin;
}