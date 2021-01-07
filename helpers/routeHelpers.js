
const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      username : Joi.string().required(),
      name: Joi.string().required(),
      age: Joi.number().integer().required()
    }),
    loginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    postSchema: Joi.object().keys({
      title: Joi.string().required(),
      context: Joi.string().required()
    }) 
  }
}