import { Document, Schema, Types, model } from "mongoose";

export interface IClass extends Document {
  title: string;
  date: Date;
  description?: string;
  students: Types.ObjectId[];
}

const ClassSchema = new Schema<IClass>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

export default model<IClass>("Class", ClassSchema);
