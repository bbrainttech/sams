import { Router } from "express";
import * as attCtrl from "../controllers/attendance-controller";

const router = Router({ mergeParams: true });
router.patch("/", attCtrl.recordAttendance);
router.get("/", attCtrl.getAttendanceByClass);
router.patch("/:studentId", attCtrl.updateAttendanceStatus);
export default router;
