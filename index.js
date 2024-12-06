const express = require("express");
const { CommunicationIdentityClient } = require("@azure/communication-identity");

const app = express();
const PORT = 3000;

// Azure Communication Services connection string
const connectionString = "endpoint=https://comapi-poc.unitedstates.communication.azure.com/;accesskey=2t6IfoigugHIwB47dwpvaxSUl7TkujS0R4dxupXKBwkvbnwVJIfBJQQJ99ALACULyCp6b3plAAAAAZCS475a";
const client = new CommunicationIdentityClient(connectionString);

// API endpoint to generate a token
app.get("/generate-token", async (req, res) => {
  try {
    // to create a new ACS user
    const user = await client.createUser();

    // Generate a token for the user
    const tokenResponse = await client.getToken(user, ["voip"]);

    // Return user ID and token in the response
    res.status(200).json({
      userId: user.communicationUserId,
      token: tokenResponse.token,
      expiresOn: tokenResponse.expiresOn,
    });
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
