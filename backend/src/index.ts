import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
