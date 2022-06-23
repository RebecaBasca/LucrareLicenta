let express = require("express");
let router = express.Router();
const servicesService = require("../services/servicesService");
const functions = require("../Common/functions");

router.post("/addService", async function (req, res) {
  functions.logInformation("Case de add service");

  const jsonResponse = await servicesService.addService(
    req.query.name,
    req.query.price,
    req.query.timeSpan,
    req.query.category,
    req.query.picture,
    req.query.description
  );

  res.send(jsonResponse);
});

router.get("/getServicesByCategory", async function (req, res) {
  functions.logInformation("Case de get services by category");

  const jsonResponse = await servicesService.getServicesByCategory(
    req.query.category
  );

  res.send(jsonResponse);
});

router.get("/getServices", async function (req, res) {
  functions.logInformation("Case de get services ");

  const jsonResponse = await servicesService.getServices();

  res.send(jsonResponse);
});
router.delete("/deleteServiceById", async function (req, res) {
  functions.logInformation("Case de delete service");

  const jsonResponse = await servicesService.deleteServiceById(req.query.id);

  res.send(jsonResponse);
});




module.exports = router;
