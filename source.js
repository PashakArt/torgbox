const {
  isExistsTimeZone,
  getTimeZone,
  getResultWithTimeZone,
  getResult,
} = require("./helpers");

function mainV2(inputData) {
  let date = parseData(inputData);
  let parsedDate = new Date(date);
  if (parsedDate != "Invalid Date") {
    return parseValidDate(date);
  }
  if (isExistsTimeZone(date)) {
    const timeZone = getTimeZone(date);
    const newDate = date.slice(0, date.length - 6);
    let res = parseValidDate(newDate);
    return getResultWithTimeZone(res, timeZone);
  }
  return parseInvalidDate(date);
}

// Сначала лучше работать с более менее корректными данными

function parseValidDate(date) {
  // console.log(date);
  // console.log(new Date(date).toISOString());
  if (date.length === 10) {
    return new Date(date).toISOString();
  }
  if (isExistsTimeZone(date)) {
    const timeZone = getTimeZone(date);
    const newDate = date.slice(0, date.length - 6) + "Z";
    // console.log(newDate);
    // console.log(suffix);
    // console.log(new Date(newDate).toISOString());
    const res = new Date(newDate).toISOString();
    return getResultWithTimeZone(res, timeZone);
  }
  if (date[date.length - 1] === "Z") {
    return new Date(date).toISOString();
  }
  const newDate = date + "Z";
  return new Date(newDate).toISOString();
}

// function parseInvalidDate(date) {
//   // const
// }

function parseData(inputData) {
  const { src, options } = inputData;
  return src[options];
}

module.exports = mainV2;

// 1) Получить дату
// 2) Преобразовывается ли полученная дата к обьекту Date
// 3) Если да - то работать с ним
//     Иначе

// дата парсится с изменением во времени на часы, указанные в конце, пример +07:00

// а если выписывать все числа, а затем упаковывать их в время?
