require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiRouter = require('./routes/api')

const app = express();

app.use (express.json());
app.use(cors({origin: 'http://localhost:3000'}));


app.use('/api', apiRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log('server started on port 3001');
});