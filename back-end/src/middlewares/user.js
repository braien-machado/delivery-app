const { emailSchema, passwordSchema, nameSchema } = require('../utils/joiSchemas/userSchemas');
const { verifyToken, decodeToken } = require('../utils/jwt');

const emailMiddleware = (req, res, next) => {
  const { email } = req.body;
  const { error } = emailSchema.validate({ email });
  if (error) {
    const [status, message] = error.message.split('/');
    return res.status(+status).json({ message });
  }
  next();
};

const passwordMiddleware = (req, res, next) => {
  const { password } = req.body;
  const { error } = passwordSchema.validate({ password });
  if (error) {
    const [status, message] = error.message.split('/');
    return res.status(+status).json({ message });
  }
  next();
};

const nameMiddleware = (req, res, next) => {
  const { name } = req.body;
  const { error } = nameSchema.validate({ name });
  if (error) {
    const [status, message] = error.message.split('/');
    return res.status(+status).json({ message });
  }
  next();
};

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const verify = verifyToken(authorization);
  const decode = decodeToken(authorization);
  if (!verify) return res.status(401).json({ message: 'Invalid token' });
  if (decode.role !== 'administrator') return res.status(403).json({ message: 'Access denied' });
  next();
};

module.exports = { emailMiddleware, passwordMiddleware, nameMiddleware, authMiddleware };
