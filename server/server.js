require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');

const LoggeeMiddleware = require('./middlewares/logger');
const userRoutes = require('./src/user/userRoutes');

const app = express();

mongoose.connect(`mongodb+srv://eitand09_db_user:plsWork@cluster0.iojegta.mongodb.net/?appName=Cluster0`)
.then(()=>{
    console.log("DB is live");
})
.catch((err)=>{
    console.log("DB conection trouble:" + err);
})



app.use(cors())
app.use(express.json()); 
app.use(express.static("client"));
app.use(LoggeeMiddleware);

// Use user routes
app.use('/users', userRoutes);

app.listen(5500, () => {
    console.log(`server is on: http://localhost:5500`);
});