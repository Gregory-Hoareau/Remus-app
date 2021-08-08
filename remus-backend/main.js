const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const characterSheetRouter = require('./character-sheet')

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));
app.use('/characterSheet', characterSheetRouter)


const port = 8000
const hostname = 'localhost';

const server = app.listen(port, hostname, () => {
    console.log(`Server is listening on http://${hostname}:${port} !`);
})

app.get('/', (req, res) => {
    res.status(200).json({mes: 'OK'})
})