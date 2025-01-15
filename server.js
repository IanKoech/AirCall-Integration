const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { processCallRecording } = require("./utils/callUtils");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/callProcessingRoute", (req, res) => {
  const { event, payload } = req.body;

  if (event === "call.ended") {
    const { id, duration } = payload;
    if (duration > 300) {
      processCallRecording(id);
    }
  }

  res.status(200).send("Event received");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
