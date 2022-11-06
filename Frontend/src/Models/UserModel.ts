import RoleModel from "./RoleModel";

class UserModel {
    public id: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;
}

export default UserModel;