import Joi from "joi";

export default {
  bookId: Joi.object().keys({
    bookId: Joi.number().required().min(1).max(20),
  }),
  joinBook: Joi.object().keys({
    invttCode: Joi.string().required().length(8),
  }),
};
