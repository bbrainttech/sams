import { Router } from "express";
import * as attCtrl from "../controllers/attendance-controller";

const router = Router({ mergeParams: true });
router.patch("/:id", attCtrl.recordAttendance);
router.get("/", attCtrl.getAttendanceByClass);
export default router;
