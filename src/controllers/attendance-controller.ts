import { Request, Response, NextFunction } from "express";
import Student from "../models/student";

export const recordAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { attendance } = req.body;
    const classId = req.params.id;

    for (const record of attendance) {
      await Student.findByIdAndUpdate(record.matricule, {
        $set: { [`attendance.${classId}`]: { present: record.present } },
      });
    }

    res.json({ msg: "Attendance recorded" });
  } catch (err) {
    next(err);
  }
};

export const getAttendanceByClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await Student.find({
      [`attendance.${req.params.id}`]: { $exists: true },
    });
    res.json(
      students.map((s) => ({
        matricule: s._id,
        //@ts-ignore
        present: s.attendance.get(req.params.id).present,
      }))
    );
  } catch (err) {
    next(err);
  }
};

export const updateAttendanceStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { present } = req.body;

    await Student.findOneAndUpdate(
      {
        matricule: req.params.matricule,
      },
      {
        $set: { [`attendance.${req.params.id}`]: { present } },
      }
    );
    res.json({ msg: "Attendance updated" });
  } catch (err) {
    next(err);
  }
};
