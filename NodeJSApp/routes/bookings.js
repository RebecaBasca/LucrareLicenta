let express = require("express");
let router = express.Router();
const bookingService = require("../services/bookingService");
const functions = require("../Common/functions");

router.post("/addBooking", async function (req, res) {
  functions.logInformation("Case de add booking");
  const jsonResponse = await bookingService.addBooking(
    req.query.clientName,
    req.query.clientEmail,
    req.query.date,
    req.query.time,
    req.query.therapistName,
    req.query.service,
    req.query.forChild,
    req.query.childName
  );
  res.send(jsonResponse);
});

router.get("/getAvailableHours", async function (req, res) {
  functions.logInformation("Case de get available hours");

  const jsonResponse = await bookingService.getAvailableHours(
    req.query.therapistName,
    req.query.date
  );
  res.send(jsonResponse);
});

router.get("/getFutureBookings", async function (req, res) {
  functions.logInformation("Case de get future bookings");

  const jsonResponse = await bookingService.getFutureBookings(req.query.id);
  res.send(jsonResponse);
});

router.get("/getPreviousBookings", async function (req, res) {
  functions.logInformation("Case de get prev bookings");

  const jsonResponse = await bookingService.getPreviousBookings(
    req.query.id
  );
  res.send(jsonResponse);
});

module.exports = router;
