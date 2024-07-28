const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
const apiRoutes= require('./routes/apiRoutes')

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
