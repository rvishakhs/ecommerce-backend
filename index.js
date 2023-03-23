const express = require('express')  // to import express
const dbconnection = require('./config/dbconnection')
const app = express() // assigning express into a variable 
const dotenv = require('dotenv').config() // to enable dotenv we have to call dotenv module in node
const PORT = process.env.PORT || 4000 // assiging port

dbconnection()

app.use("/", (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

