const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./server/routes/userRoutes");
const photoRoutes = require("./server/routes/photoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* This is a way to set up routes. The first argument is the route, and the second argument is the
route handler. */
app.use("/users", userRoutes);
app.use("/photos", photoRoutes);

/* This is a way to set the port for the server. If the port is not set in the environment, it will
default to 3001. */
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log("listening on port " + port);
});
