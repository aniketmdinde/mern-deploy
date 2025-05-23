import express from 'express';
import dotenv from 'dotenv';
import path from "path"

import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json());

console.log("index");

import productRoutes from "./routes/product.routes.js"
app.use("/api/products", productRoutes);

console.log("routes");

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get(/^\/(?!api).*/, (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})