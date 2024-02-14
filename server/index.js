const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static("Public"));

const createRoute=require('./routes/CreateRoute')
const updateRoute=require('./routes/UpdateRoute')
const userRoute=require('./routes/UserRoute')
const getDataRoute=require('./routes/GetDataRoute')
const deleteRoute=require('./routes/DeleteRoute')

app.use(createRoute)
app.use(updateRoute)
app.use(userRoute)
app.use(getDataRoute)
app.use(deleteRoute)

app.listen(2000, () => {
    console.log("Server is live on port 2000");
  });



