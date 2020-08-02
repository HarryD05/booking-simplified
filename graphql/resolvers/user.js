//Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require('../../models/UserModel');

const { user } = require('./merge');

module.exports = {
  createUser: async args => {
    const details = args.userInput;

    try {
      const hashedPassword = await bcrypt.hash(details.password, 12);

      const newUser = new User({
        name: details.name,
        email: details.email,
        password: hashedPassword
      });

      const result = await newUser.save()

      return { ...result._doc, password: null }; //this ignores meta data
    } catch (error) {
      throw error;
    }
  },
  login: async args => {
    const { email, password } = args;

    const userResult = await User.findOne({ email });
    if (!userResult) {
      throw new Error('User does not exist');
    }

    const isEqual = await bcrypt.compare(password, userResult.password);

    if (!isEqual) {
      throw new Error('Password is incorrect');
    }

    //User & password match
    const token = jwt.sign(
      { userId: userResult.id, email: userResult.email, name: userResult.name },
      process.env.secretOrKey,
      { expiresIn: '1h' }
    );

    return {
      userId: userResult.id,
      token: token,
      tokenExpiration: 1
    }
  },
  userDetails: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT AUTHENTICATED');
    }

    try {
      return await user(req.userId);
    } catch (error) {
      throw error;
    }
  }
}