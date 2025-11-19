import express from "express";

const app = express();

// Database
import { connectToDatabase } from "./common/database";
await connectToDatabase();

// API endpoints
import userRouter from "./user";

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.use("/user", userRouter);

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
