import Joi from "joi";

class FollowerModel {
    public userId: string;
    public vacationId: number;

    public constructor(follower: FollowerModel) {
        this.userId = follower.userId;
        this.vacationId = follower.vacationId;
    }

    private static validationSchema = Joi.object({
        userId: Joi.string().required().guid({ version: 'uuidv4' }),
        vacationId: Joi.number().required().positive().integer()
    });

    public validate(): string {
        const result = FollowerModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default FollowerModel;