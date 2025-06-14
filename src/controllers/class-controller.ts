import { NextFunction, Request, Response } from "express";
import Class from "../models/class";

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cls = await Class.create(req.body);
    res.status(201).json(cls);
  } catch (err) {
    next(err);
  }
};

export const getClasses = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classes = await Class.find().populate("students");
    res.json(classes);
  } catch (err) {
    next(err);
  }
};

export const getClassById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cls = await Class.findById(req.params.id).populate("students");
    res.json(cls);
  } catch (err) {
    next(err);
  }
};
export const getClassStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classId = req.params.id;
    const cls = await Class.findById(classId).populate("students");
    if (!cls) {
      res.status(404).json({ msg: "Class not found" });
      return;
    }

    const transformed = cls.students.map((student: any) => {
      const present = student.attendance?.get(classId)?.present ?? false;
      return {
        _id: student._id,
        name: student.name,
        matricule: student.matricule,
        photoUrl: student.photoUrl,
        class:classId,
        present,
      };
    });

    res.json(transformed);
  } catch (err) {
    next(err);
  }
};
