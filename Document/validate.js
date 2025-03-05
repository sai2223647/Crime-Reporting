const Joi = require('joi');

const validateReport = (req, res, next) => {
  const schema = Joi.object({
    crimeType: Joi.string().required(),
    location: Joi.string().required(),
    time: Joi.date().required(),
    evidence: Joi.string().allow(''),
    witnesses: Joi.string().allow(''),
    name: Joi.string().allow(''), // Optional, anonymous
    age: Joi.number().integer().min(0).allow(''), // Optional, anonymous
    phoneNumber: Joi.string().allow(''), // Optional, anonymous
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message, status: 400 });
  next();
};

const validateForumPost = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message, status: 400 });
  next();
};

const validateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().allow(''), // Optional, anonymous
    email: Joi.string().email().allow(''), // Optional, anonymous
    message: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message, status: 400 });
  next();
};

module.exports = { validateReport, validateForumPost, validateContact };