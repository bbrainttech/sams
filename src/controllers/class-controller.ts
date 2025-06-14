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
    const cls = await Class.findById(req.params.id).populate("students");
    res.json(cls?.students || []);
  } catch (err) {
    next(err);
  }
};
