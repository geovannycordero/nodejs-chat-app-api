const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

module.exports = {
  encode: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userModel.getUserById(userId);
      const payload = {
        userId: user._id,
        userType: user.type,
      };
      const authToken = jwt.sign(payload, process.env.SECRET_KEY);
      req.authToken = authToken;
      next();
    } catch (error) {
      return res.status(400).json({ success: false, message: error.error });
    }
  },

  decode: async (req, res, next) => {
    if (!req.headers['authorization']) {
      return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
      req.userId = decoded.userId;
      req.userType = decoded.type;
      return next();
    } catch (error) {

      return res.status(401).json({ success: false, message: error.message });
    }
  }
}
