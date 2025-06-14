import { Document, Schema, model } from "mongoose";

export interface IClass extends Document {
  title: string;
  date: Date;
  description?: string;
  students: Schema.Types.ObjectId[];
}

const ClassSchema = new Schema<IClass>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

export default model<IClass>("Class", ClassSchema);
