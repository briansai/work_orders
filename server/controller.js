const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fakeDetails = require('./fakeDetails');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));

const response = (data, res) => {
  if (data) {
    return res.status(200).send(data);
  }
  return res.status(500).send('Error: No Data')
}

app.get('/work-orders', (req,res) => {
  const workOrders = fakeDetails.workOrders();
  return response(workOrders, res);
})

app.get('/workerId', (req, res) => {
  const workerData = fakeDetails.workers();
  return response(workerData, res);
})

app.listen(PORT, () => {
  console.log('Listening to port:', PORT);
});