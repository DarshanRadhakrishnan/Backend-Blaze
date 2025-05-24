const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler=require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
connectDb();
const port = process.env.PORT || 5000;
app.use(express.json);//here we use a middleware express.json which helsp in parsing the json format requests
app.use("/api/contacts",require("./routes/contactRoutes"))//here we use another middleware to just handle the routes
app.use("/api/users",require("./routes/userRoutes"))//here we use another middleware to just handle the routes
app.use(errorHandler);//here we use this middleware to handle all the errors which might be thrown during the working of this project this middle ware just contains a single function
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});