import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';

import errorHandler from './errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
