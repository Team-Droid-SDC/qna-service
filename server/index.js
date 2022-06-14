require('dotenv').config();
const express = require('express');
//middlewares
const cors = require('cors')
const morgan = require('morgan')
//files
const pool = require('./db');
const router = require('./routes');

const app = express();

// logging and parsing
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// set up routes
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});