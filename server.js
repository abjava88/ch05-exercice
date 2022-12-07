require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const employeesRouter = require('./routes/employees');

const port = process.env.PORT

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.use('/employees', employeesRouter);

app.listen(port, () => console.log('Server Started'));