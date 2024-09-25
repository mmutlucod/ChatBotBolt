const express = require('express');
const connectDB = require('./config/db');
const responseRoutes = require('./routes/chatbot');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const port = 5000;


connectDB();
app.use(cors());
// Middleware
app.use(express.json());


app.use('/api', responseRoutes);


app.get('/', (req, res) => {
  res.send('Merhaba Dünya!');
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} üzerinde çalışıyor`);
});
