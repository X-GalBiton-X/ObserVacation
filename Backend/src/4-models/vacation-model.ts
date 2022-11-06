import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    public id: number;
    public destination: string;
    public description: string;
    public image: UploadedFile;
    public imageName: string;
    public fromDate: string;
    public untilDate: string;
    public price: number;

    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.fromDate = vacation.fromDate;
        this.untilDate = vacation.untilDate;
        this.price = vacation.price;
    }

    private static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(1).max(50),
        description: Joi.string().required().min(3).max(1500),
        image: Joi.object().required(),
        imageName: Joi.string().optional().guid({ version: 'uuidv4' }).max(36).truncate(),
        fromDate: Joi.date().required().min(new Date().setUTCHours(0,0,0,0)),
        untilDate: Joi.date().required().min(Joi.ref('fromDate')),
        price: Joi.number().required().min(0).less(1000000)
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default VacationModel;