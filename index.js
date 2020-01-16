// implement your API here
const express = require("express");
const cors = require("cors");
const { find, findById, insert, remove, update } = require("./data/db");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

console.log("environment");
console.log(process.env);
console.log(process.env.PORTTT);
console.log(process.env.PORT);

app.listen(3000, () => {
	console.log(`listening on ${3000}`);
});

app.post("/api/users", (req, res) => {
	const user = req.body;

	if (!(user && user.name && user.bio)) {
		res.status(400).json({
			errorMessage: "Please provide name and bio for the user."
		});
		return true;
	}

	if (!(typeof user.name === "string" && typeof user.bio === "string")) {
		res.status(400).json({
			errorMessage: "Some fields have incorrect data"
		});
		return true;
	}

	insert(user)
		.then(data => {
			res.status(201).json({ ...user, ...data });
		})
		.catch(error => {
			res.status(500).json({
				errorMessage:
					"There was an error while saving the user to the database"
			});
		});
});

app.get("/api/users", (req, res) => {
	find()
		.then(data => {
			res.status(201).json(data);
		})
		.catch(error => {
			res.status(500).json({
				errorMessage: "The users information could not be retrieved."
			});
		});
});
app.get("/api/users/:id", (req, res) => {
	const { id } = req.params;
	findById(id)
		.then(data => {
			if (data) {
				res.status(201).json(data);
			} else {
				res.status(404).json({
					errorMessage:
						"The user with the specified ID does not exist."
				});
			}
		})
		.catch(error => {
			res.status(500).json({
				errorMessage: "The user information could not be retrieved."
			});
		})
		.finally(() => {});
});

app.delete("/api/users/:id", (req, res) => {
	const { id } = req.params;

	findById(id)
		.then(user => {
			if (user) {
				remove(id)
					.then(data => {
						if (data) {
							res.status(201).json(user);
						} else {
							res.status(404).json({
								errorMessage:
									"The user with the specified ID does not exist."
							});
						}
					})
					.catch(error => {
						res.status(500).json({
							errorMessage: "The user could not be removed"
						});
					});
			} else {
				res.status(404).json({ errorMessage: "user not found" });
			}
		})
		.catch(error => {
			res.status(500).json({
				errorMessage: "The user could not be removed"
			});
		});
});

app.put("/api/users/:id", (req, res) => {
	const { id } = req.params;
	const user = req.body;

	if (!(user && user.name && user.bio)) {
		res.status(400).json({
			errorMessage: "Please provide name and bio for the user."
		});
		return true;
	}

	if (!(typeof user.name === "string" && typeof user.bio === "string")) {
		res.status(400).json({
			errorMessage: "Some fields have incorrect data"
		});
		return true;
	}

	update(id, user)
		.then(data => {
			if (data) {
				findById(id).then(data => {
					res.status(200).json(data);
				});
			} else {
				res.status(404).json({
					errorMessage:
						"The user with the specified ID does not exist."
				});
			}
		})
		.catch(error => {
			res.status(500).json({
				errorMessage: "The user information could not be modified."
			});
		});
});
