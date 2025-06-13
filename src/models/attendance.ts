import { Document, Schema, Types, model } from "mongoose";
import { IClass } from "./class";
import { IStudent } from "./student";

export interface IAttendanceRecord {
  student: Types.ObjectId | IStudent;
  present: Boolean;
}

export interface IAttendance extends Document {
  class: Types.ObjectId | IClass;
  attendance: IAttendanceRecord[];
}

const AttendanceRecordSchema = new Schema<IAttendanceRecord>({
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  present: { type: Boolean, default: false, required: true },
});

const AttendanceSchema = new Schema<IAttendance>(
  {
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    attendance: [AttendanceRecordSchema],
  },
  { timestamps: true }
);

export default model<IAttendance>("Attendance", AttendanceSchema);
