const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("token");
  if (!token)
    return res
      .status(401)
      .send({ error: "You must provide password to fill the survey" });
  try {
    const verified = jwt.verify(token, "dqwiu38982u3hriuhwjnjrkwehrwir847w8rh");
    console.log(verified);
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
  next();
};
