const helpers = require("./helpers");

function mainV2(inputData) {
  let date = helpers.parseData(inputData);
  let parsedDate = new Date(date);
  if (parsedDate != "Invalid Date") {
    return parseValidDate(date);
  }
  if (helpers.isExistsTimeZone(date)) {
    const timeZone = helpers.getTimeZone(date);
    const newDate = date.slice(0, date.length - 6);
    const res = parseValidDate(newDate);
    return helpers.getResultWithTimeZone(res, timeZone);
  }
  return parseInvalidDate(date);
}

function parseValidDate(date) {
  if (date.length === 10) {
    return helpers.getResult(date);
  }
  if (helpers.isExistsTimeZone(date)) {
    const timeZone = helpers.getTimeZone(date);
    const newDate = date.slice(0, date.length - 6) + "Z";
    const res = new Date(newDate).toISOString();
    return helpers.getResultWithTimeZone(res, timeZone);
  }
  if (date[date.length - 1] === "Z") {
    return helpers.getResult(date);
  }
  const newDate = date + "Z";
  return helpers.getResult(newDate);
}

function parseInvalidDate(date) {
  let arr = date.split(" ");
  // console.log(arr);
  let res = "";
  for (const el of arr) {
    if (el.search(/\d/) != -1) {
      res += el.length > 5 ? `${el} ` : el;
    }
    if (helpers.monthNumber.get(el) || helpers.shortMonthNumber.get(el)) {
      res += helpers.monthNumber.get(el)
        ? helpers.monthNumber.get(el)
        : helpers.shortMonthNumber.get(el);
    }
  }
  console.log(res);

  if (helpers.checkYear(res.slice(0, 4))) {
    return parseValidDate(res);
  }
  // console.log(date, " - ", res.trim());

  // if (helpers.checkYear(res.slice(0, 4))) {
  //   // let date = res.split
  // }
  // console.log(parseValidDate(res));
  // try {
  //   console.log(parseValidDate(res));
  //   return parseValidDate(res);
  // } catch (err) {}
  return "1";
}

module.exports = mainV2;

// 1) Получить дату
// 2) Преобразовывается ли полученная дата к обьекту Date
// 3) Если да - то работать с ним
//     Иначе

// дата парсится с изменением во времени на часы, указанные в конце, пример +07:00

// а если выписывать все числа, а затем упаковывать их в время?
