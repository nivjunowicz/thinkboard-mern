import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import path from 'path';

import notesRoutes from './routes/notesRoutes.js'
import { ConnectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173'
  }));
}
app.use(express.json());

// //custom middlware example
// app.use((req, res, next) => {
//   console.log(`Req methos is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

// rate limiting middleware
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

ConnectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
  });
});


 


