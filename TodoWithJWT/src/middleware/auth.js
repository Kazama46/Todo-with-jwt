module.exports.isAuthorized = async function (req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    module.exports.isAuthorized = async function (req, res, next) {
      return res.status(401).send({ error: "Invalid token" });
    };
  }
};
