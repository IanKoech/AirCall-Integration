const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const processCallRecording = async (callId) => {
  try {
    const response = await axios.get(
      `https://api.aircall.io/v1/calls/${callId}/recording`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRCALL_API_KEY}`,
        },
      }
    );

    const recordingUrl = response.data.url;

    await axios.post(
      process.env.CALLPROCESSING_URL,
      {
        recordingUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CALLPROCESSING_TOKEN}`,
        },
      }
    );

    console.log(`Recording for call ID ${callId} processed successfully.`);
  } catch (error) {
    console.error("Error processing the call recording:", error);
  }
};

module.exports = { processCallRecording };
