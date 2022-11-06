import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/");

        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Login</h2>

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

                <button>Login</button>

            </form>
			
        </div>
    );
}

export default Login;
