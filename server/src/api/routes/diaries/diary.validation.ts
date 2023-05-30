import Joi from "joi";

export default {
  createDiary: Joi.object().keys({
    bookId: Joi.number().required(),
    title: Joi.string().required().max(30),
    content: Joi.string().required().max(400),
    picture: Joi.string().optional(),
  }),
  diaryId: Joi.object().keys({
    diaryId: Joi.number().required(),
  }),
  bookId: Joi.object().keys({
    bookId: Joi.number().required(),
  }),
  patchDiary: Joi.object().keys({
    title: Joi.string().optional().max(30),
    content: Joi.string().optional().max(400),
  }),
  putStickers: Joi.array().items(
    Joi.object({
      stickerId: Joi.number().required(),
      locX: Joi.number().required(),
      locY: Joi.number().required(),
    })
  ),
};
