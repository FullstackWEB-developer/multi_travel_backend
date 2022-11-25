import express from "express";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
// user defined
import connectDB from "./config";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import bookingRoutes from "./routes/booking.route";
import uploadRoutes from "./routes/upload";

const app = express();
app.use(compression());
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet({crossOriginResourcePolicy: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client")));

//Define Routes
app.use("/api/auth", authRoutes());
app.use("/api/user", userRoutes());
app.use("/api/booking", bookingRoutes());
app.use("/api/upload", uploadRoutes());
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
