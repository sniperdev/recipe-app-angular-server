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

const ROUTES = {
	recipes: "api/recipes"
}

app.get(ROUTES.recipes, (req,res)=>{
	res.json(recipes);
})

app.post(`${ROUTES.recipes}/add`, (req, res) => {
	try{
		recipes.push(req.body);
		res.status(201).json({ message: "Recipe added successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.put(`${ROUTES.recipes}/update/:id`, (req, res) => {
	const id = req.params.id;
	const index = recipes.findIndex((item) => item.id === id);
	if (index !== -1) {
		try {
			recipes[index] = { id, ...req.body };
			res.json({ message: "Recipe updated successfully" });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	} else {
		res.status(404).json({ message: "Recipe not found" });
	}
});

app.delete(`${ROUTES.recipes}/delete/:id`, (req, res) => {
	const index = recipes.findIndex((item) => item.id === req.params.id);
	if (index !== -1) {
		recipes.splice(index, 1);
		res.json({ message: "Recipe deleted successfully" });
	} else {
		res.status(404).json({ message: "Recipe not found" });
	}
});

app.listen(port, () => {
	console.log(`Express server is running on port ${port}`);
});