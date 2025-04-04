const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.static(path.join(__dirname, "public")));

app.get("/bilder", (req, res) => {
  const bildMapp = path.join(__dirname, "public");
  fs.readdir(bildMapp, (err, filer) => {
    if (err) {
      console.error("Kunde inte läsa mappen", err);
      res.status(500).send("Serverfel");
      return;
    }

    const bildFiler = filer.filter((fil) => /\.(jpg|jpeg|png)$/i.test(fil));
    res.json(bildFiler);
  });
});

app.listen(port, () => {
  console.log(`Servern körs på port http://localhost:${port}`);
});
