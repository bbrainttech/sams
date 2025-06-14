import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  name: string;
  matricule: string;
  photoUrl?: string;
  classes: Schema.Types.ObjectId;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    matricule: { type: String, required: true, unique: true },
    classes: [{ type: Schema.Types.ObjectId, ref: "Class", required: true }],
    photoUrl: String,
  },
  { timestamps: true }
);

export default model<IStudent>("Student", StudentSchema);
