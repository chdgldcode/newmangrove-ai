// backend/index.js (cleanest ES module version with logic separation)
import express from 'express';
import cors from 'cors';
import assessMangrove from './logic/assessLogic.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/assess', (req, res) => {
  const result = assessMangrove(req.body);
  res.json(result);
});

app.listen(4000, () => {
  console.log('✅ Mangrove AI Server running at http://localhost:4000');
});
