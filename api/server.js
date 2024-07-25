require('dotenv').config();
const express = require('express');
const cors = require('cors');

const Port = process.env.PORT || 3000;

const routes = require('./src/routes')

const app = express();
app.use(express.urlencoded({ extended:true }));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(Port, () => console.log('API de OSs respondendo na porta ' + Port));