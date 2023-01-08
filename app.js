require("dotenv").config();

const express = require("express");

const { hashPassword, verifyPassword, verifyToken} = require("./auth");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

//routes publiques

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/movies/:id/color", movieHandlers.getMovies);
app.get("/api/movies/:id/max_duration", movieHandlers.getMovies);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/users/:id/language", userHandlers.getUsers);
app.get("/api/users/:id/city", userHandlers.getUsers);
app.post ("/api/users", hashPassword, userHandlers.postUser);
app.post("/api/users/login", verifyPassword);


//routes protégées

app.use(verifyToken);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/movies/:id/color", movieHandlers.getMovies);
app.get("/api/movies/:id/max_duration", movieHandlers.getMovies);

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);


app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/users/:id/language", userHandlers.getUsers);
app.get("/api/users/:id/city", userHandlers.getUsers);
app.post("/api/users", userHandlers.postUser);
app.put("/api/users/:id", userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);




app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
