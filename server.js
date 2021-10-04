const express = require('express')
const cors = require("cors");
const userAuth = require("./auth/userAuth");
const invoice = require("./invoice/invoice")
require("dotenv").config();

const app = express()

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors());

app.use('/auth', userAuth)
app.use("/invoice", invoice)


app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`)
})