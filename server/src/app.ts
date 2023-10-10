import express from 'express';
import cors from 'cors';
var api = require('./routes/api');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use('/api', api);
app.get('/', (req, res) => {
    res.send('Product Catalog is up and running')
})
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})