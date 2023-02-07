import Joi from "joi";

export default {
  createComment: Joi.object().keys({
    diaryId: Joi.number().required(),
    parentCommentId: Joi.number().optional(),
    reply: Joi.string().required().max(150),
  }),
  commentId: Joi.object().keys({
    commentId: Joi.number().required(),
  }),
  diaryId: Joi.object().keys({
    diaryId: Joi.number().required(),
  }),
  patchComment: Joi.object().keys({
    reply: Joi.string().required().max(150),
  }),
};
