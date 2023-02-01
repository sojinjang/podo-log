import Joi from "joi";

export default {
  createDiary: Joi.object().keys({
    bookId: Joi.number().required(),
    title: Joi.string().required().max(40, "utf8"),
    content: Joi.string().required().max(580, "utf8"),
    picture: Joi.string().optional(),
  }),
  diaryId: Joi.object().keys({
    diaryId: Joi.number().required(),
  }),
  bookId: Joi.object().keys({
    bookId: Joi.number().required(),
  }),
  patchDiary: Joi.object().keys({
    title: Joi.string().optional().max(40, "utf8"),
    content: Joi.string().optional().max(580, "utf8"),
  }),
};
