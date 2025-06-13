import { NextFunction, Request, Response } from "express";
import Attendance, { IAttendanceRecord } from "../models/attendance";

export const recordAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attendance: IAttendanceRecord[] = req.body.attendance;
    let record = await Attendance.findOne({ class: req.params.id });
    if (record) {
      record.attendance = attendance;
      await record.save();
    } else {
      record = await Attendance.create({ class: req.params.id, attendance });
    }
    res.json(record.attendance);
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
    const record = await Attendance.findOne({ class: req.params.id }).populate(
      "attendance.student"
    );
    res.json(record ? record.attendance : []);
  } catch (err) {
    next(err);
  }
};
