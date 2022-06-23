const logInformation = function (message) {
  let date = new Date();
  let timestamp = ` -- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} --`;

  console.log(timestamp, message);
};

module.exports = {
  logInformation,
};
