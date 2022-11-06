import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    public id: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    private static validationSchema = Joi.object({
        id: Joi.string().optional().guid({ version: 'uuidv4' }),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(30),
        username: Joi.string().required().min(4).max(30),
        password: Joi.string().required().min(4).max(50),
        role: Joi.number().optional().integer().min(1).max(2)
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;