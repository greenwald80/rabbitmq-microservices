//Import class MicroService from micromq
const MicroMQ = require("micromq");
//import cached data from local file
const cacheData = require("./cacheData");
const {
  getNumbersFromQuery,
  addCacheData,
  isCacheDataExists,
} = require("./helpers");

//create instance of MicroService class
const app = new MicroMQ({
  // microservice name (must be the same as in Gateway)
  name: "microservice",
  // settings of rabbitmq
  rabbit: {
    // link for connecting to rabbitmq (default: amqp://guest:guest@localhost:5672)
    url: process.env.RABBIT_URL,
  },
});

//create endpoint /sum for method GET
app.get("/sum", (req, res) => {
  const numbers = getNumbersFromQuery(req);
  const checkResult = isCacheDataExists(numbers, "sum", cacheData);
  if (checkResult) {
    // send json response
    res.json({ "Sum result from cache": checkResult });
  } else {
    const update = addCacheData(
      numbers,
      "sum",
      numbers[0] + numbers[1],
      cacheData
    );
    res.json({ "Sum result from calculating": update });
  }
});

// create endpoint /sub for method GET
app.get("/sub", (req, res) => {
  const numbers = getNumbersFromQuery(req);
  const checkResult = isCacheDataExists(numbers, "sub", cacheData);
  if (checkResult) {
    // send json response
    res.json({ "Sub result from cache": checkResult });
  } else {
    const update = addCacheData(
      numbers,
      "sub",
      numbers[0] - numbers[1],
      cacheData
    );
    //send json response
    res.json({ "Substruction result from calculating": update });
  }
});

// create endpoint /multi for method GET
app.get("/multi", (req, res) => {
  const numbers = getNumbersFromQuery(req);
  const checkResult = isCacheDataExists(numbers, "multi", cacheData);
  if (checkResult) {
    // send json response
    res.json({ "Multiply result from cache": checkResult });
  } else {
    const update = addCacheData(
      numbers,
      "multi",
      numbers[0] * numbers[1],
      cacheData
    );
    //send json response
    res.json({ "Multiply result from calculating": update });
  }
});

//show all cache data
app.get("/cache", (req, res) => {
  // send json response
  res.json({ "cacheData from cache": cacheData.data });
});

// start listen the que of requests
app.start();
console.log("Microservice started");
