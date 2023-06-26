"use strict";
const express = require("express");
const app = express();
var dotenv = require("dotenv");
const cors = require("cors");

// Routes
const generateQR = require("./routes/generateQR");
const signIn = require("./routes/signIn");
const verifyXummUUID = require("./routes/verifyUUID");

dotenv.config();
app.use(cors());
app.use(express.json());



// Routes
app.post("/generateQR", generateQR);
app.post("/signIn", signIn);
app.get("/verifyUUID", verifyXummUUID);

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started successfully on port ${PORT}...`));
