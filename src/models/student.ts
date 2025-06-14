import { Document, Schema, Types, model } from "mongoose";

export interface IStudent extends Document {
  name: string;
  matricule: string;
  photoUrl?: string;
  classes: Types.ObjectId[];
  attendance: {
    [classId: string]: {
      present: boolean;
    };
  };
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    matricule: { type: String, required: true, unique: true },
    photoUrl: { type: String },
    classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],
    attendance: { type: Map, of: new Schema({ present: Boolean }) },
  },
  { timestamps: true }
);

export default model<IStudent>("Student", StudentSchema);
