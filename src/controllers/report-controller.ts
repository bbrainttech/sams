import { NextFunction, Request, Response } from "express";
import Attendance from "../models/attendance";

export const classReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = await Attendance.findOne({ class: req.params.id }).populate(
      "attendance.student"
    );
    if (!record) {
      res.status(404).json({ msg: "No attendance for this class" });
      return;
    }
    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const studentReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const records = await Attendance.find({
      "attendance.student": req.params.id,
    }).populate("class");
    const history = records.map((r) => ({
      class: (r.class as any).title,
      date: (r.class as any).date,
      status: r.attendance.find((a) => a.student.toString() === req.params.id)
        ?.status,
    }));
    res.json(history);
  } catch (err) {
    next(err);
  }
};
