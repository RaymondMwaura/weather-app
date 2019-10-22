import moment from 'moment';

const convertTemperature = (tempInKelvins) => {
  const res = tempInKelvins - 273.15;
  return res.toFixed(1);
};
const convertTime = (unixTime) => moment.unix(unixTime).format('dddd');

const filterData = (items) => {
    const daysEdit = [];
    items.forEach((el) => {
      const obj = { dt: convertTime(el.dt) };
      Object.assign(el, obj);
      if (!daysEdit.some((ele) => ele.dt === el.dt)) {
        daysEdit.push(el);
      }
    });
    return daysEdit;
  };

export {
  convertTemperature,
  filterData
};
