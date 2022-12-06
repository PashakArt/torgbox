// function main(inputData) {
//   let date = parseData(inputData);
//   let parsedDate = new Date(date);
//   if (parsedDate != "Invalid Date") {
//     console.log(parseValidDate(date));
//     return parseValidDate(date);
//   }
//   return "1";
//   // return parseInvalidDate(date);
// }

// function parseValidDateV2(date, suffix) {
//   const newDate = date.slice(0, date.length - 6) + "Z";
//   const res = new Date(newDate).toISOString();
//   return res.slice(0, res.length - 1) + suffix;
// }

function isExistsTimeZone(date) {
  return date[date.length - 6] === "+" || date[date.length - 6] === "-";
}

function getTimeZone(date) {
  return date.slice(date.length - 6);
}

function getResultWithTimeZone(res, timeZone) {
  return res.slice(0, res.length - 1) + timeZone;
}

function getResult(date) {
  return new Date(newDate).toISOString();
}

module.exports = {
  isExistsTimeZone,
  getTimeZone,
  getResultWithTimeZone,
  getResult,
};
