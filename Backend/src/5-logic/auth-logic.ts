import { OkPacket } from "mysql";
import auth from "../2-utils/auth";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import hash from "../2-utils/cyber";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";
import { v4 as uuid } from "uuid";

async function register(user: UserModel): Promise<string> { // Returning a new token

    // Validate:
    const error = user.validate();
    if (error) throw new ValidationError(error);
    const existingUsername = await isExistingUsername(user.username);
    if (existingUsername) throw new UnauthorizedError("This username is already taken");

    // Hash the given password: 
    user.password = hash(user.password);

    // Create minimum role:
    user.role = RoleModel.User;

    // Create user id:
    user.id = uuid();

    // Create sql:
    const sql = "INSERT INTO users VALUES(UUID_TO_BIN(?, 0), ?, ?, ?, ?, ?)";

    // Insert new user into database:
    const info: OkPacket = await dal.execute(sql, [
        user.id,
        user.firstName,
        user.lastName,
        user.username,
        user.password,
        user.role
    ]);

    // Delete password:
    delete user.password;

    // Generate new token:
    const token = auth.generateNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    // Validate:
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    // Hash the given password: 
    credentials.password = hash(credentials.password);

    // Create sql:
    const sql = `SELECT
                    BIN_TO_UUID(userId, 0) AS id,
                    firstName,
                    lastName,
                    username,
                    password,
                    roleId AS role
                    FROM users
                    WHERE username = ? AND password = ?`;

    // Check if user exists and get result:
    const users = await dal.execute(sql, [
        credentials.username,
        credentials.password
    ]);
    const user = users[0];

    // If no such user exists:
    if (!user) throw new UnauthorizedError("Incorrect username or password");

    // Delete password:
    delete user.password;

    // Generate new token:
    const token = auth.generateNewToken(user);

    return token;
}

// Check if given username already exists:
async function isExistingUsername(username: string): Promise<boolean> {
    const sql = `SELECT
                    username
                    FROM users
                    WHERE username = ?`;
    const result = await dal.execute(sql, username);
    const existingUsername = result.length;
    if (existingUsername) {
        return true;
    }
    return false;
}

export default {
    register,
    login,
    isExistingUsername
};