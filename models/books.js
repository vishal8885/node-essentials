const Joi = require("@hapi/joi");

const schema = Joi.object({
  bookName: Joi.string(),
  ISBN: [Joi.number().min(3), Joi.required()],
  publisherName: Joi.string(),
  authorName: Joi.string(),
  authorId: Joi.number(),
  price: Joi.number(),
  publishedYear: Joi.number()
    .integer()
    .min(1900)
    .max(2019),
  reviewers: Joi.array().items(Joi.string()),
  numberOfPages: Joi.number(),
  country: Joi.string()
});

module.exports = schema;