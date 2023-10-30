const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
	extended: true,
}))
app.use(bodyParser.json());

const port = 8080;

const recipes = [];


app.listen(port, () => {
	console.log(`Express server is running on port ${port}`);
});