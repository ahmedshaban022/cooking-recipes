const jwt = require("jsonwebtoken");

const Users = require("../Models/user");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "missing feilds!" });

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exist" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "The password must be 6 charachters or more" });

    const newUser = new Users({ name, email, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({
      msg: "Registered Successfully",
      token,
      userId: newUser._id,
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    console.log(error.meassag);
    return res.status(500).json({ msg: error.meassag });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "missing feilds!" });

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Email or password is wrong" });

    const isMatched = await user.matchPassword(password);
    if (!isMatched)
      return res.status(400).json({ msg: "Email or password is wrong" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      msg: "Login Successfully",
      token,
      userId: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.log(error.meassag);
    return res.status(500).json({ msg: error.meassag });
  }
};
module.exports = { login, register };
