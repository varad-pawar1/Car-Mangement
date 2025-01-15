import express from "express";
import { carController, getCarsController, updateCarController, getCarsControllerByTitle, deleteCarsController } from "../controllers/websiteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const carRoutes = express.Router();

carRoutes.post("/product", authMiddleware, carController);

carRoutes.get("/product", authMiddleware, getCarsController);
carRoutes.get("/product/:title", authMiddleware, getCarsControllerByTitle);

carRoutes.delete("/product/:title", authMiddleware, deleteCarsController);

carRoutes.put("/product/:title", authMiddleware, updateCarController);
// authMiddleware


export { carRoutes };



