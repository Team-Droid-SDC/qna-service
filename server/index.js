const express = require('express');
const app = express();

app.use(express.json());

// we will eventually use env variables
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server Started');
});