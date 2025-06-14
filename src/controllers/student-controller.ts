import { NextFunction, Request, Response } from "express";
import Class from "../models/class";
import Student from "../models/student";

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, matricule, photoUrl, classes, attendance } = req.body;

    const classDocs = await Class.find({ _id: { $in: classes } });
    // if (classDocs.length !== classes.length) {
    //   res.status(400).json({ msg: "One or more classes not found" });
    //   return;
    // }

    const student = await Student.create({
      name,
      matricule,
      photoUrl,
      classes,
      attendance,
    });

    for (const classDoc of classDocs) {
      //@ts-ignore
      classDoc.students.push(student._id);
      await classDoc.save();
    }

    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

export const getStudents = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await Student.find().populate("classes");
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
    const student = await Student.findById(req.params.id).populate("classes");
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
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ msg: "Student not found" });
      return;
    }

    const classIds = student.classes;
    for (const classId of classIds) {
      await Class.findByIdAndUpdate(classId, {
        $pull: { students: student._id },
      });
    }

    await student.deleteOne();
    res.json({ msg: "Student deleted and removed from all classes" });
  } catch (err) {
    next(err);
  }
};
