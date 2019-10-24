/**
 *
 * @function convertTemperature - coverts kelvins to celcius
 * @param {*} tempInKelvins
 * @returns celcius degree
 */
const convertTemperature = (tempInKelvins) => {
  const res = tempInKelvins - 273.15;
  return res.toFixed(1);
};


/**
 *
 * @function convertTime - converts unix time to day, month, year
 * @param {*} unixTime - unix time
 * @returns {*} - containing day, month and year
 */
const convertTime = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const dateArr = date.toDateString().split(' ');
  return {
    day: dateArr[0],
    date: dateArr[1],
    month: dateArr[2],
    year: dateArr[3],
  };
};


/**
 * @function filterData - it filters the data from api and provide five days data
 * @param [*] days - takes the weather list
 * @returns [*] daysFiltered - returns clean lists with only 5days data
 */
const filterData = (days) => {
  const daysFiltered = [];
  days.forEach((el) => {
    const obj = { dt: convertTime(el.dt) };
    Object.assign(el, obj);
    if (!daysFiltered.some((ele) => ele.dt.day === el.dt.day)) {
      daysFiltered.push(el);
    }
  });
  return daysFiltered;
};

export {
  convertTemperature,
  filterData,
};
