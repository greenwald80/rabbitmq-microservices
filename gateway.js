//Import class MicroService from micromq
const Gateway = require("micromq/gateway");

const { getNumbersFromQuery } = require("./helpers");

//create instance of MicroService class
const app = new Gateway({
  // microservice name to call
  microservices: ["microservice"],
  // settings of rabbitmq
  rabbit: {
    // link for connecting to rabbitmq (default: amqp://guest:guest@localhost:5672)
    url: process.env.RABBIT_URL,
  },
});

// create all endpoints for calculator actions
app.get(["/sum", "/sub", "/multi", "/cache"], async (req, res) => {
  const arr = Object.values(getNumbersFromQuery(req));
  //check for 2 numbers in parameters only
  if (arr.length !== 2) {
    res.json({ Error: "Enter 2 numbers only" });
    return;
  }
  //check 2 parameters
  if (arr.some(isNaN)) {
    res.json({ Error: "You must enter numbers" });
    return;
  } else {
    // redirect the request to microservice calculator
    await res.delegate("microservice");
  }
});

// start listen of port
app.listen(process.env.PORT || 3000);
console.log("Gateway started on port 3000");
