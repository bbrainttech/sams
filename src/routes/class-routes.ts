import { Router } from "express";
import * as classCtrl from "../controllers/class-controller";

const router = Router();
router.post("/", classCtrl.createClass);
router.get("/", classCtrl.getClasses);
router.get("/:id", classCtrl.getClassById);
router.patch("/:id", classCtrl.updateClass);
router.delete("/:id", classCtrl.deleteClass);
export default router;
