import { Router } from "express";
import * as studentCtrl from "../controllers/student-controller";

const router = Router();
router.post("/", studentCtrl.createStudent);
router.get("/", studentCtrl.getStudents);
router.get("/:id", studentCtrl.getStudentById);
router.put("/:id", studentCtrl.updateStudent);
router.delete("/:id", studentCtrl.deleteStudent);
export default router;
