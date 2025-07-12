import express, { Express } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import carRoutes from "./routes/vehicles";
import userRoutes from "./routes/users";
import reservationRoutes from "./routes/reservation";
import dotenv from "dotenv";
import path from "path";
import connectToSequalize from "./db/connection";
import sequalize from "./db/connection";
import relations from "./db/relations";
import cookieParser from "cookie-parser";
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3001", 10);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", carRoutes);
app.use("/api/users",userRoutes );
app.use("/api/reservations",reservationRoutes)
app.listen(PORT, async () => {

  relations()


  try {
  await  connectToSequalize.authenticate()
    
  sequalize.sync({alter:true})
    // syncUserModel()
    console.log("connected to db ,thats great!")
  } catch (error) {
    console.log("no connection to database")
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
