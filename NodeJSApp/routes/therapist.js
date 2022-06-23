let express = require("express");
let router = express.Router();
const therapistService = require("../services/therapistService");
const functions = require("../Common/functions");

router.get("/getTherapists", async function (req, res) {
  functions.logInformation("Case de get therapists");

  const jsonResponse = await therapistService.getTherapists();
  res.send(jsonResponse);
});

router.post("/addTherapist", async function (req, res) {
  functions.logInformation("Case de add therapist");

  const jsonResponse = await therapistService.addTherapist(
    req.query.name,
    req.query.specialty,
    req.query.picture,
    req.query.description
  );
  res.send(jsonResponse);
});

router.delete("/deleteTherapistById", async function (req, res) {
  functions.logInformation("Case de delete therapist");

  const jsonResponse = await therapistService.deleteTherapistById(req.query.id);
  res.send(jsonResponse);
});

module.exports = router;
