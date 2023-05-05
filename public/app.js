const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors()); // This line of code allows requests from any domain

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public")); // This line of code serves the files in the public folder

// The following line of code reads the json stored in service-requests.json then writes new data to service-requests.json
app.post("/service-requests", (req, res) => {
  const filePath = path.join(__dirname, "./service-requests.json");
  const requestData = req.body;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    const serviceRequests = JSON.parse(data);

    requestData.id = getNextServiceRequestId(serviceRequests);

    serviceRequests.push(requestData);

    fs.writeFile(filePath, JSON.stringify(serviceRequests), (err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      res.sendStatus(200);
    });
  });
});

// The following line of code auto increments the id of the service request
function getNextServiceRequestId(serviceRequests) {
  const lastServiceRequest = serviceRequests[serviceRequests.length - 1];
  return lastServiceRequest ? lastServiceRequest.id + 1 : 1;
}

const port = process.env.PORT || 4004; // This line of code sets the port to 4004

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // This line of code logs the port to the console
});
