import mongoose from "mongoose";

export async function connectToDatabase() {
	const dbName = process.env.MONGO_INITDB_DATABASE || "photomaton";
	const uri = process.env.MONGO_URI || "mongodb://localhost:27017/" + dbName;

	try {
		await mongoose.connect(uri, {
			dbName,
		});
		console.log(`Connected to MongoDB (db: ${dbName})`);
	} catch (err) {
		console.error("MongoDB connection error:", err);
		process.exit(1);
	}
}
