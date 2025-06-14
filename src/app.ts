import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import attendanceRoutes from "./routes/attendance-routes";
import classRoutes from "./routes/class-routes";
import reportRoutes from "./routes/report-routes";
import studentRoutes from "./routes/student-routes";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/classes/:id/attendance", attendanceRoutes);
app.use("/api/reports", reportRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  }
);

export default app;
