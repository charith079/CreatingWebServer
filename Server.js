const express = require('express');
const connectDb = require('./db.js');
const bodyParser = require('body-parser');
const cors  = require('cors');
const Users = require('./models/Users.js');
const userRouter = require('./routes/userRoutes.js');

const app = express();

const PORT = process.env.PORT||5000;

connectDb();

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req,res)=>{
  res.send("Welcome to Server Page !!");
});

app.use('/users',userRouter);

app.listen(PORT,()=>{
  console.log(`Server is running on port:${PORT}`);
})

