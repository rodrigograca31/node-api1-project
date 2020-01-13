// implement your API here
const express = require("express");
const cors = require("cors");
const { find, findById, add, remove, update } = require("./data/db");
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
	console.log("listening on 3000");
});
