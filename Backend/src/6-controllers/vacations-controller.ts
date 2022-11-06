import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";
// import FollowerModel from "../4-models/follower-model";
// import auth from "../2-utils/auth";

const router = express.Router();

// GET http://localhost:3001/api/vacations/
router.get("/vacations/", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacations();
        response.json(vacations);
    } catch (err: any) {
        next(err);
    }
});

// // GET http://localhost:3001/api/vacations/
// router.get("/vacations/", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const authHeader = request.header("authorization");
//         const userID = auth.getUserIdFromToken(authHeader)
//         const vacations = await vacationsLogic.getAllVacations(userID);
//         response.json(vacations);
//     } catch (err: any) {
//         next(err);
//     }
// });


// GET http://localhost:3001/api/vacations/:id
router.get("/vacations/:id", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacation(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    } catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/vacations/:id
router.put("/vacations/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const id = +request.params.id;
        request.body.id = id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    } catch (err: any) {
        next(err);
    }
});

router.put("/vacations/:id/follow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
   try {
    // TODO: implement follow logic
    console.log(`following vacation ${request.params.id}`);
   } catch (err: any) {
    next(err);
   }
});

// DELETE http://localhost:3001/api/vacations/:id
router.delete("/vacations/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacation(id);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});



// // POST http://localhost:3001/api/follow
// router.post("/follow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const follower = new FollowerModel(request.body);
//         const follow = await vacationsLogic.followAsync(follower);
//         response.status(201).json(follow);
//     } catch (err: any) {
//         next(err);
//     }
// });

// // POST http://localhost:3001/api/unFollow
// router.post("/unFollow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const follower = new FollowerModel(request.body);
//         const unFollow = await vacationsLogic.unFollowAsync(follower);
//         response.status(201).json(unFollow);
//     } catch (err: any) {
//         next(err);
//     }
// });

export default router;