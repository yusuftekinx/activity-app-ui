const jwt = require("jsonwebtoken");

const token = async (req, res, next) => {
  const { name, phone } = req.body;
    console.log("Name:",name)
    console.log("Phone",phone)

  const token = await jwt.sign(
    { name: name, phone: phone },
    "aktivityappsecretKey",
    {
      expiresIn: "3h",
    }
  );

  res.json({
    token,
  });
};

module.exports = token;
