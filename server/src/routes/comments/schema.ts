import Joi from "joi";

export default {
  createComment: Joi.object().keys({
    diaryId: Joi.number().required(),
    parentCommentId: Joi.number().optional(),
    reply: Joi.string().required().max(180, "utf8"),
  }),
  commentId: Joi.object().keys({
    commentId: Joi.number().required(),
  }),
  patchComment: Joi.object().keys({
    reply: Joi.string().required().max(180, "utf8"),
  }),
};
