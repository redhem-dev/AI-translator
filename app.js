const express = require("express");
require("dotenv").config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(express.json());

const translationRequest = require('./routes/api/v1/gen/communication');

app.use('/', translationRequest);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


