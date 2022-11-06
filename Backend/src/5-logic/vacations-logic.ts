import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../2-utils/safe-delete";
// import FollowerModel from "../4-models/follower-model";

async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT
                    vacationId AS id,
                    destination,
                    description,
                    imageName,
                    fromDate,
                    untilDate,
                    price
                    FROM vacations`;
    const vacations = await dal.execute(sql);
    return vacations;
}

// //* Get all vacations:
// async function getAllVacations(userID: string): Promise<VacationModel[]> {
//     //* Create sql:
//     const sql = `SELECT DISTINCT
//                   V.*,
//                   EXISTS (SELECT * FROM followers WHERE vacationID = F.vacationID AND userID = ?) AS isFollowing,
//                   COUNT (F.userID) AS followersCount
//                   FROM vacations AS V LEFT JOIN followers AS F
//                   ON V.vacationID = F.vacationID
//                   GROUP BY vacationID
//                   ORDER BY isFollowing DESC`;

//     //* Get data from database:
//     const vacations = await dal.execute(sql, userID);

//     //* Return it:
//     return vacations;
// }

async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT
                    vacationId AS id,
                    destination,
                    description,
                    imageName,
                    fromDate,
                    untilDate,
                    price
                    FROM vacations
                    WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, id);
    const vacation = vacations[0];
    if (!vacation) throw new IdNotFoundError(id);
    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    
    // Validate:
    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    // If image file is given:
    if (vacation.image) {
        const extension = vacation.image.name.substring( // Extract extension --> .gif / .png / .jpg / .jpeg
            vacation.image.name.lastIndexOf(".")
        );
        vacation.imageName = uuid() + extension; // Create image name.
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName); // Copy image onto HardDisk.
        delete vacation.image; // Delete File before saving.
    }

    // Create sql:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

    // Insert new vacation into database:
    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.imageName,
        vacation.fromDate,
        vacation.untilDate,
        vacation.price
    ]);

    // Get vacation id:
    vacation.id = result.insertId;

    return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    
    // Validate:
    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    // If image file is given:
    if (vacation.image) {
        await safeDelete("./src/1-assets/images/" + vacation.imageName); // Check and delete previous image.
        const extension = vacation.image.name.substring( // Extract extension --> .gif / .png / .jpg / .jpeg
            vacation.image.name.lastIndexOf(".")
        );
        vacation.imageName = uuid() + extension; // Create image name.
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName); // Copy image onto HardDisk.
        delete vacation.image; // Delete File before saving.
    }

    // Create sql:
    let sql = `UPDATE vacations SET
                    destination = ?,
                    description = ?,
                    imageName = ?,
                    fromDate = ?,
                    untilDate = ?,
                    price = ?
                    WHERE vacationId = ?`

    // Update vacation in database:
    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.imageName,
        vacation.fromDate,
        vacation.untilDate,
        vacation.price,
        vacation.id
    ]);

    if (result.affectedRows === 0) throw new IdNotFoundError(vacation.id);

    return vacation;
}

async function deleteVacation(id: number): Promise<void> {
    const vacation = await getOneVacation(id);
    await safeDelete("./src/1-assets/images/" + vacation.imageName); // Check and delete image.
    const sql = `DELETE FROM vacations
                    WHERE vacationId = ?`;
    await dal.execute(sql, id);
}

// //* Follow:
// async function followAsync(follower: FollowerModel): Promise<FollowerModel> {
//     const error = follower.validate();
//     if (error) throw new ValidationError(error);

//     const sql = `INSERT INTO followers VALUES(?, ?)`;

//     const result: OkPacket = await dal.execute(sql, [
//         follower.userId,
//         follower.vacationId
//     ]);

//     return follower;
// }

// //* Unfollow:
// async function unFollowAsync(follower: FollowerModel): Promise<void> {
//     const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`;

//     const result: OkPacket = await dal.execute(sql, [follower.userId, follower.vacationId]);

//     if (result.affectedRows === 0) throw new IdNotFoundError(parseInt(follower.userId) || follower.vacationId);
// }

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
    // followAsync,
    // unFollowAsync,
};
