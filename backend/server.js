const express = require('express');
const cors = require('cors');
const assessMangrove = require('./logic/assessLogic');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/assess', (req, res) => {
  const result = assessMangrove(req.body);
  res.json(result);
});

app.listen(4000, () => {
  console.log('Mangrove AI Server running at http://localhost:4000');
});
