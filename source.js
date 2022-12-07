const helpers = require("./helpers");

function main(inputData) {
  let date = helpers.parseData(inputData);
  let parsedDate = new Date(date);
  if (parsedDate != "Invalid Date") {
    return helpers.parseValidDate(date);
  }
  if (helpers.isExistsTimeZone(date)) {
    const timeZone = helpers.getTimeZone(date);
    const newDate = date.slice(0, date.length - 6);
    const res = helpers.parseValidDate(newDate);
    return helpers.getResultWithTimeZone(res, timeZone);
  }
  return helpers.parseInvalidDate(date);
}

module.exports = main;
