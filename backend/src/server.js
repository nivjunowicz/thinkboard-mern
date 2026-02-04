import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import notesRoutes from './routes/notesRoutes.js'
import { ConnectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5001;

// middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

// //custom middlware example
// app.use((req, res, next) => {
//   console.log(`Req methos is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

// rate limiting middleware
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

ConnectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
  });
});

app.get('/', (req, res) => {
  res.status(200).send('Hello from homepage');
});

 


