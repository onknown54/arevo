exports.isDateNotExpired = (expirationDate) => {
  return new Date(expirationDate) > new Date();
};

exports.addDaysToCurrentDate = (currDate, daysToAdd) => {
  const currentDate = !currDate ? Date.now() : new Date(currDate);
  currentDate.setDate(currentDate.getDate() + daysToAdd ?? 0);
  return currentDate.toString();
};

exports.formatReadableDate = (date) => {
  if (!date) return;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos",
  };

  return date.toLocaleDateString("en-NG", options);
};
