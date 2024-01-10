let user;

export const setLoggedInUser = (data) => {
  user = data;
};

export const getLoggedInUserData = () => user;

export const addLeadingZeros = (value) => {
  value = String(value);
  while (value.length < 2) {
    value = "0" + value;
  }
  return value;
};

export const countDownCalculations = (dateData) => {
  let diff =
    (Date.parse(new Date(Number(dateData))) - Date.parse(new Date())) / 1000;
  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
    millisec: 0,
  };

  if (diff >= 365.25 * 86400) {
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years;
  }
  if (diff >= 86400) {
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }
  if (diff >= 3600) {
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  if (diff < 0) {
    return timeLeft;
  }
  timeLeft.sec = diff;
  return timeLeft;
};

export const dateCheck = (nft) => {
  if (isNaN(Number(nft))) {
    return new Date(nft);
  } else {
    return new Date(Number(nft));
  }
};

export const changeUserAmount = (obj, amount) => {
  return {
    ...obj,
    data: { ...obj.data, nTokenBalance: amount },
  };
};

export const bottomReached = ({ target }) => {
  return target.offsetHeight + target.scrollTop + 5 >= target.scrollHeight;
};
