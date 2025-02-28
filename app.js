const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*', 
  methods: 'POST',
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Length,X-Requested-With',
  credentials: true,
};

app.use(cors(corsOptions));


app.options('*', cors(corsOptions));


app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(express.json());

const translationRequest = require('./routes/api/v1/gen/communication');

app.use('/', translationRequest);


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


