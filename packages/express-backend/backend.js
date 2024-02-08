import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Fetch users by name, job, or both
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name && job) {
	// Fetch user by name AND job
	userServices.getUsers(name, job)
	    .then(users => {
		res.send(users);
	    })
	    .catch(error => {
		res.staus(500).json({ error: error.message });
	    });
    } else if (name) {
	// Fetch user by name
	userServices.findUserByName(name)
	    .then(users => {
		res.send(users);
	    })
	    .catch(error => {
		res.status(500).json({ error: error.message });
	    });
    } else if (job) {
	// Fetch user by job
	userServices.findUserByJob(job)
	    .then(users => {
		res.send(users);
	    })
	    .catch(error => {
		res.status(500).json({ error: error.message });
	    });
    } else {
	// Fetch all users
	userServices.getUsers()
	    .then(users => {
		res.send(users);
	    })
	    .catch(error => {
		res.status(500).json({ error: error.message });
	    });
    }
});

// Create/insert new users
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userServices.addUser(userToAdd)
	.then(addedUser => {
	    res.status(201).json(addedUser);
	})
	.catch(error => {
	    res.status(500).json({ error: error.message });
	});
});

// Fetch users by ID
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    userServices.findUserById(id)
	.then(user => {
	    if (!user) {
		res.status(404).send("Resource not found.");
	    } else {
		res.send(user);
	    }
	})
	.catch(error => {
	    res.status(500).json({ error: error.message });
	});
});

// Delete users by ID
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    userServices.findUserbyId(id)
	.then(user => {
	    if (!user) {
		res.status(404).send("Error: Resource not found.");
	    } else {
		userServices.deleteUserById(id)
		    .then(deletedUser => {
			res.status(204).send();
		    })
		    .catch(error => {
			res.status(500).json({ error: error.message });
		    });
	    }
	})
	.catch(error => {
	    res.status(500).json({error: error.message });
	});
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
