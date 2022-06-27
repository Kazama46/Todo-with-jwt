const router = require("express").Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Invalid email or password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send("Invalid email or password");
  }
  if (user.password !== password) {
    res.status(400).send("Invalid email or password");
  }
  const userDetail = {
    id: user._id,
    password: user.password,
  };

  const token = jwt.sign(userDetail, process.env.JWT_SECRET, {
    expiresIn: "168h",
  });

  res.status(200).send({ token });
});

module.exports = router;
