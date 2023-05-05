const fs = require("fs");

// The following line of code reads the json stored in service-requests.json
const serviceRequests = JSON.parse(fs.readFileSync("./service-requests.json"));

// The following line of code parses the json stored in service-requests.json
const simplifiedServiceRequests = serviceRequests.map(({name, description, phone}) => ({name, description, phone}));
console.log(simplifiedServiceRequests);