const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { event, payload } = req.body;
  if (event === "call.ended") {
    const { id, duration } = payload;
    if (duration > 300) {
      processCallRecording(id);
    }
  }
  res.status(200).send("Webhook received");
});

module.exports = router;
