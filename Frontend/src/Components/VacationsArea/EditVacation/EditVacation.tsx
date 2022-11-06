import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsServices";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    useVerifyAdmin();

    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    useEffect(() => {
        const id = +params.vacationId;
        vacationsService.getOneVacation(id)
            .then(vacation => {
                setValue("id", vacation.id);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                // setValue("imageName", vacation.imageName); <-- Do I need this or not?? Assaf (teacher) didn't add this but Niv (student) did.
                setValue("fromDate", vacation.fromDate);
                setValue("untilDate", vacation.untilDate);
                setValue("price", vacation.price);
            })
            .catch(err => notifyService.error(err));
    }, [params.vacationId, setValue]);

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.updateVacation(vacation);
            notifyService.success("Vacation has been updated");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Edit Vacation</h2>

                <input type="hidden" {...register("id")} />

                <label>Destination: </label>
                <input type="text" {...register("destination", {
                    required: { value: true, message: "Missing destination" },
                    minLength: { value: 1, message: "Destination must be minimum 1 chars" },
                    maxLength: { value: 50, message: "Destination can't exceed 50 chars" },
                })} />
                <span>{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("description", {
                    required: { value: true, message: "Missing description" },
                    minLength: { value: 3, message: "Description must be minimum 3 chars" },
                    maxLength: { value: 1500, message: "Description can't exceed 1,500 chars" },
                })} />
                <span>{formState.errors.description?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", {
                    required: { value: true, message: "Missing image" },
                    // ???: { value: ???, message: "File must be an image" },
                })} />
                <span>{formState.errors.image?.message}</span>

                {/* For the dates maybe set as ISO dates and also maybe add the cool single input field where you can choose both from and until together. */}
                <label>From: </label>
                <input type="date" {...register("fromDate", {
                    required: { value: true, message: "Missing begin date" },
                    // ???: { value: ???, message: "Begin date can't be before current date" },
                })} />
                <span>{formState.errors.fromDate?.message}</span>

                <label>Until: </label>
                <input type="date" {...register("untilDate", {
                    required: { value: true, message: "Missing end date" },
                    // ???: { value: ???, message: "End date can't be before begin date" },
                })} />
                <span>{formState.errors.untilDate?.message}</span>

                {/* If integer, don't show decimal point */}
                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 999999, message: "Price must be less than 1,000,000" }, // I wanna try to do like backend Joi validation...
                })} />
                <span>{formState.errors.price?.message}</span>

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditVacation;
