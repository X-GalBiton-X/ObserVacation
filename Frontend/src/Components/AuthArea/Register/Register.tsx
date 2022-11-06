import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Register</h2>

                <label>First name: </label>
                <input type="text" {...register("firstName", {
                    required: { value: true, message: "Missing first name" },
                    minLength: { value: 2, message: "First name must be minimum 2 chars" },
                    maxLength: { value: 30, message: "First name can't exceed 30 chars" },
                })} />
                <span>{formState.errors.firstName?.message}</span>

                <label>Last name: </label>
                <input type="text" {...register("lastName", {
                    required: { value: true, message: "Missing last name" },
                    minLength: { value: 2, message: "Last name must be minimum 2 chars" },
                    maxLength: { value: 30, message: "Last name can't exceed 30 chars" },
                })} />
                <span>{formState.errors.lastName?.message}</span>

                <label>Username: </label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "Missing username" },
                    minLength: { value: 4, message: "Username must be minimum 4 chars" },
                    maxLength: { value: 30, message: "Username can't exceed 30 chars" },
                })} />
                <span>{formState.errors.username?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password" },
                    minLength: { value: 4, message: "Password must be minimum 4 chars" },
                    maxLength: { value: 50, message: "Password can't exceed 50 chars" },
                })} />
                <span>{formState.errors.password?.message}</span>

                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;
