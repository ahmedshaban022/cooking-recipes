const Users = require("../Models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({ msg: "Missed token" });
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ _id: tokenData.id });
    if (!user) return res.status(400).json({ msg: "Not Allowed" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
