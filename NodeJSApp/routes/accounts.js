let express = require("express");
let router = express.Router();
const accountService = require("../services/accountService");
const functions = require("../Common/functions");

router.post("/signup", async function (req, res) {
  functions.logInformation("Case de signup");

  const jsonResponse = await accountService.createAccount(
    req.query.name,
    req.query.emailAddress,
    req.query.password,
    req.query.accType
  );

  res.send(jsonResponse);
});

router.post("/login", async function (req, res) {
  functions.logInformation("Case de login");

  const jsonResponse = await accountService.loginAccount(
    req.query.emailAddress,
    req.query.password
  );

  res.send(jsonResponse);
});

router.get("/validateToken", async function (req, res) {
  functions.logInformation("Case de validate token");

  const jsonResponse = await accountService.validateToken(
    req.query.id,
    req.query.token
  );

  res.send(jsonResponse);
});

router.post("/changeName", async function (req, res) {
  functions.logInformation("Case de change name");

  const jsonResponse = await accountService.changeName(
    req.query.id,
    req.query.newName,
    req.query.token
  );

  res.send(jsonResponse);
});

router.post("/changeEmail", async function (req, res) {
  functions.logInformation("Case de change email");

  const jsonResponse = await accountService.changeEmail(
    req.query.id,
    req.query.newEmail,
    req.query.token
  );

  res.send(jsonResponse);
});

router.post("/changePassword", async function (req, res) {
  functions.logInformation("Case de change password");

  const jsonResponse = await accountService.changePassword(
    req.query.id,
    req.query.newPassword,
    req.query.token
  );

  res.send(jsonResponse);
});

router.get("/getAccountInfo", async function (req, res) {
  functions.logInformation("Case de get informatii despre cont");

  const jsonResponse = await accountService.getAccountInfo(
    req.query.emailAddress,
    req.query.password
  );

  res.send(jsonResponse);
});

module.exports = router;
