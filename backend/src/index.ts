import express from "express";
import { connectToDatabase } from "./common/database";

const app = express();
const port = process.env.PORT || 3001;

// Database
await connectToDatabase();

// API endpoints

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
