import { Router } from "express";
import * as classCtrl from "../controllers/class-controller";

const router = Router();
router.post("/", classCtrl.createClass);
router.get("/", classCtrl.getClasses);
router.get("/:id", classCtrl.getClassById);
router.get("/:id/students", classCtrl.getClassStudents);
export default router;
