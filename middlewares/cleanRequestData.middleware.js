exports.cleanRequestData = (req, res, next) => {
  if (req.method === "GET") return next();
  req.body = cleanUpData(req.body) ?? {};
  next();
};

function cleanUpData(data) {
  if (!data || typeof data !== "object") return data;

  const entries = Object.entries(data)
    .filter(([key, value]) => key.trim() !== "" && value != null)
    .map(([key, value]) => {
      if (typeof value !== "string") return [key, value];
      const trimmedValue = value.trim();

      return [key, key === "email" ? trimmedValue.toLowerCase() : trimmedValue];
    });

  return Object.fromEntries(entries);
}
