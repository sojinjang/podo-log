import Joi from "joi";

export default {
  bookId: Joi.object().keys({
    bookId: Joi.number().required(),
  }),
  joinBook: Joi.object().keys({
    invttCode: Joi.string().required().length(8),
  }),
};
