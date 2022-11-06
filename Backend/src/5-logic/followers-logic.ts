import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ClientError, IdNotFoundError, ValidationError } from "../4-models/client-errors";
import FollowerModel from "../4-models/follower-model";

async function getFollowersCount(): Promise<FollowerModel[]> {
    const sql = `SELECT COUNT(userId) AS followersCount, vacationId
                    FROM followers
                    GROUP BY vacationId;`;
    const followArray = await dal.execute(sql);
    return followArray;
}

async function isFollowing(userId: string): Promise<FollowerModel[]> {
    const sql = `SELECT vacationId AS followedVacations
                    FROM followers
                    WHERE BIN_TO_UUID(userId, 0) = ?;`;
    const followedVacations = await dal.execute(sql, userId);
    // if (!followedVacations.length) throw new IdNotFoundError(parseInt(userId));
    return followedVacations;
}

async function follow(follower: FollowerModel): Promise<FollowerModel> {

    // Validate:
    const error = follower.validate();
    if (error) throw new ValidationError(error);

    // Create sql:
    const sql = `INSERT INTO followers
                    SELECT userId, vacationId
                    FROM users JOIN vacations
                    WHERE BIN_TO_UUID(userId, 0) = ? AND vacationId = ?;`;

    // Get result:
    const result: OkPacket = await dal.execute(sql, [
        follower.userId,
        follower.vacationId
    ]);

    if (result.affectedRows === 0) throw new ClientError(404, "Incorrect user id or vacation id");

    return follower;
}

async function unfollow(follower: FollowerModel): Promise<void> {

    // Validate:
    const error = follower.validate();
    if (error) throw new ValidationError(error);

    // Create sql:
    const sql = `DELETE FROM followers
                    WHERE BIN_TO_UUID(userId, 0) = ? AND vacationId = ?;`;

    // Unfollow
    const result: OkPacket = await dal.execute(sql, [
        follower.userId,
        follower.vacationId
    ]);

    if (result.affectedRows === 0) throw new ClientError(404, "Incorrect user id or vacation id");
}

export default {
    getFollowersCount,
    isFollowing,
    follow,
    unfollow
};