const User = require("../models/User");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const user = req.user
      res.json({ user})
    } catch (err) {
      console.log(err)
    }
  }
}    