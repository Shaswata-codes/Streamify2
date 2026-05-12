import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongoDb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import adminRoute from "./src/routes/adminRoute.js";
import userRoute  from "./src/routes/userRoute.js";





const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);

app.use("/api/admin", adminRoute);

app.use("/api/user",  userRoute);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

