	// External imports.
import express from "express";
import cors  from 'cors'
import "dotenv/config";

// Internal imports.
import { connectDB } from "./connectDb.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import path from "path";

const __dirname = path.resolve()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'))

app.use(cors({
	origin: "http://localhost:5173",
}))

// Cunstom route.
app.use("/user", userRoute);
app.use("/post", postRoute);

app.use(express.static(path.join(__dirname, "/Frontend/dist")))
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})

// Common error hendler.
app.use((err, req, res, next) => {
	if (res.headersSent) {
		next("There is A problem!");
	} else {
		if (err.message) {
			res.status(500).send(err.message);
		} else {
			res.send("There is an Error!");
		}
	}
});

// DB connect and preparing the Server.
const PORT = process.env.PORT;
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`App listning at PORT: ${PORT}!`);
		});
	})
	.catch((error) => {
		console.log("Somthing went worng!", error);
	});