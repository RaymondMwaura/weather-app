/**
 *
 * @function convertTemperature - coverts kelvins to celcius
 * @param {*} tempInKelvins
 * @returns string degree
 */
const convertTemperature = (tempInKelvins) => {
  const res = tempInKelvins - 273.15;
  return res.toFixed(0);
};


/**
 *
 * @function convertTime - converts unix time to day, month, year
 * @param {*} unixTime - unix time
 * @returns {*} - containing day, month and year
 */
const convertTime = (unixTime) => {
    const date = new Date(unixTime*1000);
    const dateArr = date.toDateString().split(" ")
    return {
        day: dateArr[0],
        month: dateArr[1],
        date: dateArr[2],
        year: dateArr[3],
        }
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

export const toTimeStamp = (input) => {
    const parts = input.trim().split(' ');
    const date = parts[0].split('-');
    const time = (parts[1] ? parts[1] : '00:00:00').split(':');

    // NOTE:: Month: 0 = January - 11 = December.
    const d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
    return d.getTime() / 1000;
};

export {
    convertTime,
      convertTemperature,
      filterData
};
