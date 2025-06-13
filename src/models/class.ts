import { Document, Schema, Types, model } from "mongoose";

export interface IClass extends Document {
  title: string;
  date: Date;
  description?: string;
}

const ClassSchema = new Schema<IClass>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String },
    
  },
  { timestamps: true }
);

export default model<IClass>("Class", ClassSchema);
