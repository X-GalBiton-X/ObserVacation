import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import FollowerModel from "../4-models/follower-model";
import followersLogic from "../5-logic/followers-logic";

const router = express.Router();

// GET http://localhost:3001/api/followers
router.get("/followers", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followArray = await followersLogic.getFollowersCount();
        response.json(followArray);
    } catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/followers/:userId
router.get("/followers/:userId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const followedVacations = await followersLogic.isFollowing(userId);
        response.json(followedVacations);
    } catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/followers
router.put("/followers/follow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowerModel(request.body);
        const addedFollower = await followersLogic.follow(follower);
        response.status(201).json(addedFollower);
    } catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/followers
router.put("/followers/unfollow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowerModel(request.body);
        await followersLogic.unfollow(follower);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});

export default router;