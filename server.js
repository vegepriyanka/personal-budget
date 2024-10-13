// Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');

const budgetSchema = require('../personal-budget/models/schema');

const budget = mongoose.model('budget', budgetSchema, 'budgetdb');

const mongoDB = 'mongodb://127.0.0.1/budgetdb';
app.use(cors());
app.use(express.json());

// const budget = {
//     myBudget: [
//         {
//             title: 'Eat out',
//             budget: 25
//         },
//         {
//             title: 'Rent',
//             budget: 275
//         },
//         {
//             title: 'Grocery',
//             budget: 110
//         },
//     ]
// };
const myBudgetData = require(__dirname + '/myBudget.json');

app.use(express.static(path.join(__dirname, 'public')));
//app.get('/',express.static('public'))

// app.get('/budget', (req, res) => {
//     res.json(budget);
// });

main = async () => {
  await mongoose
    .connect(mongoDB)
    .then(() => {
      console.log(`Connected to mongo db`);
    })
    .catch((err) => {
      console.error(err);
    });
};

app.get('/budget', async function (req, res) {
  budget
    .find({})
    .then((data) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send([]);
    });
});

app.post('/addNewBudget', async (req, res) => {
  const body = req.body;

  const newBudgetEntry = new budget(body);

  await budget
    .create(newBudgetEntry)
    .then((response) => {
      console.log(response);
      res.send(JSON.stringify(response));
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send(
        'Failed to create the budget entry, please check data for any errors'
      );
    });
});

app.get('/hello', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});

main();
