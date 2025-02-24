const express = require("express");
require("dotenv").config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(express.json());

const translationRequest = require('./routes/api/v1/gen/communication');
const rewardsRequest = require('./routes/api/v1/gen/contreebute');
const askAI = require('./routes/api/v1/gen/questions');

app.use('/', translationRequest);
app.use('/', rewardsRequest);
app.use('/', askAI);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


