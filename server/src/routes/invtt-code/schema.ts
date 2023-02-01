import Joi from "joi";

export default {
  createCode: Joi.object().keys({
    bookId: Joi.string().required().min(1).max(20),
  }),
};
