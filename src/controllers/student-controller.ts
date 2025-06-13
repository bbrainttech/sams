import { NextFunction, Request, Response } from "express";
import Student, { IStudent } from "../models/student";

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student: IStudent = await Student.create({
      ...req.body,
      matricule: req.body.matricule.toLowerCase(),
    });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ msg: "Failded to create student" });
    next(err);
  }
};

export const getStudents = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ msg: "Student not found" });
      return;
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: "Student removed" });
  } catch (err) {
    next(err);
  }
};
