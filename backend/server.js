import path from 'path'
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from 'morgan'
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

/*app.get("/", (req, res) => {
  res.send("API is running........");
});*/

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) //making the uploads folder static


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
  app.get("/", (req, res) => {
    res.send("API is running........");
  });
}

  

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runnnning in ${process.env.NODE_ENV} mode on port -  ${PORT}`.yellow
      .bold
  )
);
