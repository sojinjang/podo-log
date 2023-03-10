import Joi from "joi";

export default {
  createBook: Joi.object().keys({
    bookName: Joi.string().required().min(1).max(20),
    color: Joi.string().required(),
  }),
  bookId: Joi.object().keys({
    bookId: Joi.number().required(),
  }),
  getByDiaryId: Joi.object().keys({
    diaryId: Joi.number().required(),
    bookId: Joi.number().required(),
  }),
  patchBook: Joi.object().keys({
    bookName: Joi.string().optional().min(1).max(20),
    color: Joi.string().optional(),
  }),
  getPage: Joi.object().keys({
    limit: Joi.number().optional().min(1),
    start: Joi.number().optional().min(1),
  }),
};
