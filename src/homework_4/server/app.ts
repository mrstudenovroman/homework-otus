import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import AuthRoute from './routes/auth';

const app = express();
const PORT = 8000;

mongoose.connect(
  'mongodb://127.0.0.1:27017/mycourses',
  { useUnifiedTopology: true, useNewUrlParser: true },
  function (err) {
    if (err) return console.log(err);
    app.listen(PORT, function () {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  },
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));
app.use('/', AuthRoute);
