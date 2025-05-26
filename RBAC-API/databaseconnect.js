const mongoose = require("mongoose");
require('dotenv').config()
const dbConnect = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://darshan2005rv:OSFQE1jQVCjhvXoa@cluster4.ja8j4cz.mongodb.net/darshan2005rv?retryWrites=true&w=majority&appName=Cluster4");
    console.log(
      `Database connected : ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
