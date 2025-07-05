import express, { Express } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import carRoutes from "./routes/vehicles";
import dotenv from "dotenv";
import path from "path";
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3001", 10);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", carRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
