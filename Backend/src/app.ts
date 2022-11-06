import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationsController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import followersController from "./6-controllers/followers-controller";
import expressFileUpload from "express-fileupload";
import config from "./2-utils/config";
import expressRateLimit from "express-rate-limit";
import sanitize from "./3-middleware/sanitize";

const server = express();

server.use("/api/", expressRateLimit({
    windowMs: 500,
    max: 10,
    message: "Request overload!"
}));
server.use(express.static('src/1-assets'));
server.use(cors());
server.use(express.json());
server.use(sanitize);
server.use(expressFileUpload());
server.use("/api", vacationsController);
server.use("/api", authController);
server.use("/api", followersController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));