import { NextFunction, Request, Response } from "express";
import ClassModel, { IClass } from "../models/class";

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cls: IClass = await ClassModel.create(req.body);
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
    const classes = await ClassModel.find();
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
    const cls = await ClassModel.findById(req.params.id);
    if (!cls) {
      res.status(404).json({ msg: "Class not found" });
      return;
    }
    res.json(cls);
  } catch (err) {
    next(err);
  }
};

export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cls = await ClassModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(cls);
  } catch (err) {
    next(err);
  }
};

export const deleteClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ClassModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Class removed" });
  } catch (err) {
    next(err);
  }
};
