exports.isEmptyObject = (obj) => Object.entries(obj).length === 0;

exports.getDiscountPrice = (actualPrice, discountPercentage) => {
  if (!actualPrice || !discountPercentage) return 0;
  return actualPrice - (actualPrice * discountPercentage) / 100;
};

exports.parseQuery = (qryStr) => {
  let queryStr = JSON.stringify({ ...qryStr }).replace(
    /\b(gte|gt|lte|lt|ne)\b/g,
    (match) => `$${match}`,
  );

  return JSON.parse(queryStr);
};
