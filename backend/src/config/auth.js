export default {
  secret: process.env.APP_SECRET,
  options: { expiresIn: process.env.TOKEN_LIFETIME },
};
