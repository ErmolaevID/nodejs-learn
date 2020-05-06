const express = require("express"); 
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => { // to handle GET request
  res.status(200);
  res.sendFile(path.join(__dirname, "views", "index.html"));
}); 
app.get("/about.html", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});