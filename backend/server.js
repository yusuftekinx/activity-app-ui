const express = require('express');
const app = express();
const tokenrouter = require('./Router/Token/Token')
const cors = require('cors');


app.use(cors())
app.use(express.json())
app.use('/api',tokenrouter)

app.listen(5000,() => {
    console.log(`Backend Started in 5000 port : http://localhost:5000`)
})