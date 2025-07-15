import express, { Express } from "express";
import {PrismaClient  } from "@prisma/client";
import cors from "cors";
import authRoutes from "./routes/auth";
import carRoutes from "./routes/vehicles";
import userRoutes from "./routes/users";
import reservationRoutes from "./routes/reservation";
import locationRoutes from "./routes/location";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3001", 10);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
// app.use("/api/vehicles", carRoutes);
// app.use("/api/users",userRoutes );
// app.use("/api/reservations",reservationRoutes)
// app.use("/api/locations",locationRoutes)
app.listen(PORT, async () => {

  console.log(`Server is running at http://localhost:${PORT}`);
});
