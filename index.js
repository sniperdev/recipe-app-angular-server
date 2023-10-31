const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
	extended: true,
}))
app.use(bodyParser.json());
app.use(cors());

const port = 8080;

const recipes = [{
	id:"1",
	name: "Scrambled Eggs",
	preparationTime: "10",
	description: "Scrambled eggs are a quick and easy breakfast classic. This dish is made by beating eggs, cooking them in a pan with a bit of butter, and seasoning with salt and pepper. You can also add a touch of milk for creaminess. It's a versatile dish that you can customize with your favorite toppings like cheese, herbs, or even diced vegetables. Scrambled eggs are perfect for a hearty breakfast or brunch and can be ready in no time.",
	ingredients: [
		{ name: "Eggs", quantity: "3" },
		{ name: "Butter", quantity: "1" },
		{ name: "Salt", quantity: "1" },
		{ name: "Pepper", quantity: "1" },
		{ name: "Milk", quantity: "2" }
	]
},{
	id:"2",
	name: "Caesar Salad",
	preparationTime: "20",
	description: "A Caesar salad is a classic and refreshing choice for a light meal. It features crispy romaine lettuce, croutons, and a rich Caesar dressing. To make it, you'll need to prepare the dressing with a blend of minced anchovy fillets, garlic, lemon juice, and creamy Parmesan cheese. Toss the dressing with the lettuce and croutons for a delightful crunch and flavor. You can also top it with grilled chicken or shrimp for a heartier option. Caesar salad is a timeless favorite for its simple yet delicious combination of ingredients.",
	ingredients: [
		{ name: "Romaine Lettuce", quantity: "1" },
		{ name: "Croutons", quantity: "1" },
		{ name: "Grated Parmesan Cheese", quantity: "1" },
		{ name: "Caesar Dressing", quantity: "1" },
		{ name: "Lemon Juice", quantity: "1" },
		{ name: "Anchovy Fillets", quantity: "2" },
		{ name: "Garlic", quantity: "1" }
	]
},{
	id:"3",
	name: "Spaghetti Bolognese",
	preparationTime: "30",
	description: "Spaghetti Bolognese is a beloved Italian pasta dish that combines al dente spaghetti with a rich, savory meat sauce. The sauce is made by sautéing ground beef with onions and garlic, then simmering it with tomato sauce and a blend of seasonings. The result is a hearty and flavorful sauce that pairs perfectly with the tender spaghetti. Top it with grated Parmesan cheese for an extra layer of taste. Spaghetti Bolognese is a comforting and satisfying meal, ideal for gatherings or cozy family dinners.",
	ingredients: [
		{ name: "Ground Beef", quantity: "1" },
		{ name: "Onion", quantity: "1" },
		{ name: "Garlic", quantity: "2" },
		{ name: "Tomato Sauce", quantity: "1" },
		{ name: "Spaghetti", quantity: "8" },
		{ name: "Olive Oil", quantity: "2" },
		{ name: "Dried Oregano", quantity: "1" },
		{ name: "Grated Parmesan Cheese", quantity: "1" }
	]
}];

const ROUTES = {
	recipes: "/api/recipes"
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