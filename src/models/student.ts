import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  name: string;
  matricule: string;
  photoUrl?: string;
  // class: Types.ObjectId | IClass;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    matricule: { type: String, required: true, unique: true },
    // class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    photoUrl: String,
  },
  { timestamps: true }
);

export default model<IStudent>("Student", StudentSchema);
